import React from "react";
import {
  Icon,
  Menu,
  Sidebar as SideBar,
  Container,
  Button,
  Popup,
  Image,
} from "semantic-ui-react";
import UserIcon from "../../images/elliot.jpg";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import AgoraLogo from "../../images/logo2.png";

export const Sidebar = ({ children, items }) => {
  const { signOut, currentUser } = useUserContext();
  return (
    <SideBar.Pushable>
      <SideBar
        width="thin"
        size="large"
        as={Menu}
        animation="overlay"
        icon="labeled"
        vertical
        visible={true}
      >

        <Menu.Item as={Link} to="/dashboard">
          <img src={AgoraLogo} />
        </Menu.Item>
        <Menu.Item as={Link} to="/quizzes">
          <Icon name="gamepad" />
          Quizzes
        </Menu.Item>
        <Menu.Item as={Link} to="/history">
          <Icon name="camera" />
          History
        </Menu.Item>
        <Menu.Item as={Link} to="/profile">
          <Icon name="user" />
          User Profile
        </Menu.Item>
      </SideBar>
      <SideBar.Pusher style={{ minHeight: "100vh" }}>
        <Menu
          color="teal"
          backgroundColor="teal"
          inverted
          size="massive"
          borderless
          fixed="top"
        >
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Popup
              header={currentUser.email}
              content={currentUser.role}
              trigger={<Image src={currentUser.avatar} avatar />}
            />
            <Button negative onClick={() => signOut()}>
              Log out
            </Button>
          </div>
        </Menu>
        <Container fluid style={{ paddingLeft: 165, paddingTop: 65 }}>
          {children}
        </Container>
      </SideBar.Pusher>
    </SideBar.Pushable>
  );
};
