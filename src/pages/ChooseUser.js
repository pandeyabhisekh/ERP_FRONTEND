import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);;

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Adminlogin');
      }
    }

    else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1"
        const studentName = "Dipesh Awasthi"
        const fields = { rollNum, studentName, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Studentlogin');
      }
    }

    else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12"
        const fields = { email, password }
        setLoader(true)
        dispatch(loginUser(fields, user))
      }
      else {
        navigate('/Teacherlogin');
      }
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container maxWidth="lg">
        <HeaderContainer>
          <MainTitle>Welcome to EduPortal</MainTitle>
          <SubTitle>Choose your role to continue</SubTitle>
        </HeaderContainer>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Admin")}>
              <StyledPaper elevation={8}>
                <IconContainer className="admin-icon">
                  <AccountCircle fontSize="large" />
                </IconContainer>
                <StyledTypography>
                  Admin
                </StyledTypography>
                <DescriptionText>
                  Login as an administrator to access the dashboard to manage app data.
                </DescriptionText>
                <HoverIndicator />
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Student")}>
              <StyledPaper elevation={8}>
                <IconContainer className="student-icon">
                  <School fontSize="large" />
                </IconContainer>
                <StyledTypography>
                  Student
                </StyledTypography>
                <DescriptionText>
                  Login as a student to explore course materials and assignments.
                </DescriptionText>
                <HoverIndicator />
              </StyledPaper>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div onClick={() => navigateHandler("Teacher")}>
              <StyledPaper elevation={8}>
                <IconContainer className="teacher-icon">
                  <Group fontSize="large" />
                </IconContainer>
                <StyledTypography>
                  Teacher
                </StyledTypography>
                <DescriptionText>
                  Login as a teacher to create courses, assignments, and track student progress.
                </DescriptionText>
                <HoverIndicator />
              </StyledPaper>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        <LoadingText>Please Wait</LoadingText>
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const HeaderContainer = styled(Box)`
  text-align: center;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffffff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const StyledPaper = styled(Paper)`
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: white;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-10px) scale(1.03);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    
    &::before {
      left: 100%;
    }

    .admin-icon {
      color: #ff6b6b;
      transform: scale(1.1);
    }

    .student-icon {
      color: #4ecdc4;
      transform: scale(1.1);
    }

    .teacher-icon {
      color: #45b7d1;
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(-5px) scale(1.02);
  }
`;

const IconContainer = styled(Box)`
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  .admin-icon {
    color: #ff8a8a;
  }
  
  .student-icon {
    color: #6ce5e6;
  }
  
  .teacher-icon {
    color: #6cb7ff;
  }

  & > svg {
    font-size: 4rem !important;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: black;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const DescriptionText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: black;
  margin-bottom: 0;
  font-weight: 300;
`;

const HoverIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
  transition: width 0.3s ease;
  
  ${StyledPaper}:hover & {
    width: 80%;
  }
`;

const LoadingText = styled.span`
  margin-left: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;