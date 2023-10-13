import { Title, Text, Button, Container, Box } from "@mantine/core";
import classes from "../styles/networkError.module.css";
import { useNavigate } from "react-router-dom";

const NetworkError = () => {
  const navigate = useNavigate();
  return (
    <Container
      className={classes.root}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 15,
        height: "100%",
      }}
    >
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Connect to the internet</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        You're offline. Check your connection.
      </Text>
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        display={"flex"}
        justify="center"
      >
        <Button
          variant="subtle"
          onClick={() => navigate(0)}
          sx={{
            "&:hover": {
              color: "white",
            },
          }}
          size="md"
        >
          Retry
        </Button>
      </Box>
    </Container>
  );
};

export default NetworkError;
