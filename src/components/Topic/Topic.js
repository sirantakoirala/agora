
import React, { useEffect, useState } from "react";
import { PostModal } from "../Dashboard/PostModal"
import { useParams } from "react-router-dom";
import { Sidebar } from "../Dashboard/Sidebar";
import {
  Button,
  Checkbox,
  Form,
  Card,
  Icon,
  Label,
  Image,
  TextArea,
  Container,
  Rail,
  Divider,
  Segment,
  Header,
} from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useUserContext } from "../../context/userContext";
import { db } from "../../firebase-config";
export const Topic = () => {
  const { topicId } = useParams();
  const { currentUser } = useUserContext();
  const [ posts, setPosts ] = useState( [] );
  const [ formState, setFormState ] = useState( "" );
  const [ topic, setTopic ] = useState( {} );

  useEffect( () => {
    async function getTopic() {
      try {
        const q = query(
          collection( db, "topics" ),
          where( "topicId", "==", topicId )
        );

        const querySnapshot = await getDocs( q );
        const [ topic ] = querySnapshot.docs.map( ( post ) => post.data() );
        console.log( "Des" + topic.topicDescription );
        if ( topic.likeId != null )
          topic.likeIdCount = Object.keys( topic.likeId ).length;
        else topic.likeIdCount = 0;
        if ( topic.dislikeId != null )
          topic.dislikeIdCount = Object.keys( topic.dislikeId ).length;
        else topic.dislikeIdCount = 0;
        if ( topic.haspinned == null )
          topic.haspinned = false;
        setTopic( topic );
      } catch ( err ) {
        console.log( err );
      }
    }
    getTopic();
  }, [] );

  useEffect( () => {
    async function getPosts() {
      try {
        const q = query(
          collection( db, "posts" ),
          where( "topicId", "==", topicId )
        );
        console.log( "getPosts" );
        const unsub = await onSnapshot( q, ( querySnapshot ) => {
          const posts = querySnapshot.docs
            .map( ( post ) => post.data() )
            //.sort( ( a, b ) => ( b.createdAt - a.createdAt ) );
            .sort( function ( a, b ) {

              var ap, bp;
              if ( a.likeId != null ) ap = Object.keys( a.likeId ).length;
              if ( b.likeId != null ) bp = Object.keys( b.likeId ).length;
              return b.pinned - a.pinned || bp - ap || b.createdAt - a.createdAt;
            } );
          {
            posts.map( ( post, index ) => {
              //            console.log(post.createdAt + (post.pinned == true ? 1000000000000: 0 ));
              if ( post.likeId != null )
                post.likeIdCount = Object.keys( post.likeId ).length;
              else post.likeIdCount = 0;
              if ( post.dislikeId != null )
                post.dislikeIdCount = Object.keys( post.dislikeId ).length;
              else post.dislikeIdCount = 0;
            } )
          }
          setPosts( posts );

        } );

        return unsub;
      } catch ( err ) {
        console.log( err );
      }
    }
    return getPosts();
  }, [] );

  const handleLikeClick = async ( ev, parent ) => {
    ev.preventDefault();
    if ( currentUser.role != "teacher" ) return;
    //       if(parent)
    console.log( currentUser.role );
    if ( parent.likeId.includes( currentUser.uid ) == false &&
      parent.dislikeId.includes( currentUser.uid ) == false ) {
      var parentDoc;
      if ( parent === topic )
        parentDoc = doc( db, "topics", parent.topicId );
      else parentDoc = doc( db, "posts", parent.postId );
      await updateDoc( parentDoc, {
        likeId: arrayUnion( currentUser.uid ),
      } )
      parent.likeIdCount++;
      parent.likeId.push( currentUser.uid );
      //setTopic(arr=>[...topics]);
    }
  }

  const handledisLikeClick = async ( ev, parent ) => {
    ev.preventDefault();
    console.log( currentUser.role );
    if ( parent.likeId.includes( currentUser.uid ) == false &&
      parent.dislikeId.includes( currentUser.uid ) == false ) {
      var parentDoc;
      if ( parent === topic )
        parentDoc = doc( db, "topics", parent.topicId );
      else parentDoc = doc( db, "posts", parent.postId );
      await updateDoc( parentDoc, {
        dislikeId: arrayUnion( currentUser.uid ),
      } );
      parent.dislikeIdCount++;
      parent.dislikeId.push( currentUser.uid );
      //setTopic(arr=>[...topics]);
    }
  }
  const handlePin = async ( ev, post ) => {
    console.log( "BBBBB" );
    const postDoc = doc( db, "posts", post.postId );
    await updateDoc( postDoc,
      {
        pinned: true,
      } );
    post.pinned = true;
    const topicDoc = doc( db, "topics", topic.topicId );
    await updateDoc( topicDoc, {
      haspinned: true,
    } );
    topic.haspinned = true;
    setTopic( topic );
    setPosts( arr => [ ...posts ] );

  }
  const handleUnPin = async ( ev, post ) => {
    console.log( "BBBBB" );
    const postDoc = doc( db, "posts", post.postId );
    await updateDoc( postDoc,
      {
        pinned: false,
      } );
    post.pinned = false;
    const topicDoc = doc( db, "topics", topic.topicId );
    await updateDoc( topicDoc, {
      haspinned: false,
    } );
    topic.haspinned = false;
    setTopic( topic );
    setPosts( arr => [ ...posts ] );

  }

  const handleDeletePost = async (ev,post) => {
    const postDoc = doc( db, "posts", post.postId );
    setPosts( arr => [ ...posts ] );
    const topicDoc = doc( db, "topics", topic.topicId );
    if(post.pinned == true)
    {
     
      await updateDoc( topicDoc, {
        haspinned: false,
      } );
      topic.haspinned = false;
    }
    await updateDoc( topicDoc, {
      comment: topic.comment-1,
    } );
    setTopic( topic );    
    deleteDoc(postDoc);
  }
  const checkIsTeacher = () => {
    if ( currentUser.role == "teacher" ) return true;
    else return false;
  }
  const setIconColor = ( likeId, uId ) => {
    if ( likeId != null && likeId.includes( uId ) == true )
      return "green";
    return "black";
  }

  const setUserIconColor = ( user ) => {
    if ( currentUser.displayname == user )
      return "red";
    return "black";
  }
  const handlePostModal = async () => {
    console.log( "AAhahahaA" );
  }
  return (
    <Sidebar >
      {/* <Card style={{ width: "100%" }}>
        <Card.Content style={{ width: "100% !important" }}>
          <Card.Header>{topic.topicTitle}</Card.Header>
          <Card.Meta>{topic.topicSubject}</Card.Meta>
          <Image src={topic.topicImage} size="huge" />
          <Card.Description>{topic.topicDescription}</Card.Description>
          <Label>{topic.user}</Label>
        </Card.Content>
        
      </Card> */}
      <Card
        style={ { width: "99%" } }
        header={<h1 >
        {topic.topicTitle}
        </h1>  }
        meta={ topic.topicSubject }
        description={ topic.topicDescription }
        extra={
          <div >
            {topic.topicImage!=null && <Image src={ topic.topicImage } size="medium" />}
            <h4>
              <Icon color={ setUserIconColor( topic.user ) } name="user" />
              { topic.user }
            </h4>
            { <div>
              <Button onClick={ ( e ) => handleLikeClick( e, topic ) }>
                <Icon color={ setIconColor( topic.likeId, currentUser.uid ) } name='thumbs up' />
                { topic.likeIdCount }
              </Button>
              <Button onClick={ ( e ) => handledisLikeClick( e, topic ) }>
                <Icon color={ setIconColor( topic.dislikeId, currentUser.uid ) } name='thumbs down' />
                { topic.dislikeIdCount }
              </Button>
              {/* <Button disabled>
                        <Icon color={setIconColor(topic.likeId,currentUser.uid)} name='comment' />
                        {topic.comment}
                        </Button> */}
            </div> }

          </div>
        }
      />

      <PostModal topicId={ topicId } curComment={ topic.comment } onShow={ handlePostModal() } />
      <Divider
        as='h4'
        className='header'
        horizontal
        style={ { margin: '5em 0em', textTransform: 'uppercase' } }
      >
        <a >Answers</a>
      </Divider>

      <Container >
        { posts.map( ( post ) => (
          <Card

            style={ { width: "100%", margin: '0em 0em 0em 0em', backgroundColor: post.pinned == true ? 'HoneyDew' : 'white' } }
            className="e-card-horizontal"
            header={ <>
              <h3>
                <Icon color={ setUserIconColor( post.user ) } name="user" />
                { post.user }
                { checkIsTeacher() == true &&
                  ( <Button icon='delete' size='tiny' style={ { display: 'relative', float: 'right'} } onClick={ ( e ) => handleDeletePost( e, post ) }/>
                  )
                }
              </h3>
            </>
            }
            description={ <>
              <Container>{ post.postTitle }</Container>
              <Rail close position='right'>
                <Button.Group vertical>
                  <Button onClick={ ( e ) => handleLikeClick( e, post ) } >
                    <Icon color={ setIconColor( post.likeId, currentUser.uid ) } name='thumbs up' />
                    { post.likeIdCount }
                  </Button>
                  <div>---</div>
                  <Button onClick={ ( e ) => handledisLikeClick( e, post ) }>
                    <Icon color={ setIconColor( post.dislikeId, currentUser.uid ) } name='thumbs down' />
                    { post.dislikeIdCount }
                  </Button>

                </Button.Group>
              </Rail>

              <Image src={ post.postImage } size="small" />

            </> }
            extra={
              <div >
                { checkIsTeacher() == true && topic.haspinned == false &&
                  ( <Button icon='check circle' style={ { display: 'flex', float: 'right' } } onClick={ ( e ) => handlePin( e, post ) }>
                  </Button> )
                }
                
                { checkIsTeacher() == true && post.pinned == true &&
                  ( <Button icon='undo' style={ { display: 'flex', float: 'right' } } onClick={ ( e ) => handleUnPin( e, post ) }>
                  </Button> )
                }
              </div>

            }
          />
        ) ) }

      </Container>

    </Sidebar>
  );
};
