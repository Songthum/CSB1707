import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/profileData.json')
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  if (!profile) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>
          <Typography variant="h6">
            <strong>Name:</strong> {profile.name}
          </Typography>
          <Typography variant="h6">
            <strong>Age:</strong> {profile.age}
          </Typography>
          <Typography variant="h6">
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Typography variant="h6">
            <strong>Bio:</strong> {profile.bio}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
