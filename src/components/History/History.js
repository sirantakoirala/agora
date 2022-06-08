import React, { useState ,useEffect} from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { db,storage} from "../../firebase-config";
import { query,where,collection, addDoc ,doc,setDoc,serverTimestamp, arrayRemove, updateDoc,arrayUnion, getDoc, getDocs} from "firebase/firestore";
import { Sidebar } from "../Dashboard/Sidebar";
export const History = () =>
{
    const [historys, setHistory] = useState();//histories
    const { currentUser } = useUserContext();
    useEffect(() => {
        async function getHistory() {
            console.log(currentUser.uid);
          try {
              
                const q = query(
                    collection(db, "users"),
                    where("uid", "==", currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                const [historys] = querySnapshot.docs.map((post) => post.data());

                setHistory(historys.history);
          } catch (err) {
            console.log(err);
          }
        }
        return getHistory();
      }, []);
    const splithistory = (history) => {
        const data = history.split("^");

        return(
            
            <Table.Row>
            <Table.Cell>{data[0]}</Table.Cell>
            <Table.Cell>{data[1]}</Table.Cell>
            <Table.Cell>{data[2]}</Table.Cell>
            <Table.Cell ><div dangerouslySetInnerHTML={{__html: data[3]}}></div></Table.Cell>
            
            </Table.Row>
            // <div>
            //     {history}
            // </div>
        )
    }
    return(
        //dangerouslySetInnerHTML={{__html: data[3]}}
        <Sidebar>
            <Table color="GhostWhite" key="GhostWhite">
                <Table.Header >
                    <Table.Row>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell> 
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                   {historys!=undefined && historys.length!=0 && historys.map((history) =>(
                   splithistory(history)
                    ))}

                </Table.Body>
            </Table>
        </Sidebar>
    )   
}