import { Box, List, ListItem, ListSubheader } from "@mui/material";
import { memo } from "react";

const Transitions = () => (
  <Box
    sx={{
      justifyContent: "space-between",
      textAlign: "left",
      marginTop: "50px",
    }}
  >
    <List
      sx={{
        textAlign: "left",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "800px",
        backgroundColor: "#000",
      }}
    >
      <ListSubheader>Game Of Life Transitions</ListSubheader>
      <ListItem>
        Any live cell with fewer than two live neighbours dies, as if by
        underpopulation.
      </ListItem>
      <ListItem>
        Any live cell with two or three live neighbours lives on to the next
        generation.
      </ListItem>
      <ListItem>
        Any live cell with more than three live neighbours dies, as if by
        overpopulation.
      </ListItem>
      <ListItem>
        Any dead cell with exactly three live neighbours becomes a live cell, as
        if by reproduction.
      </ListItem>
    </List>
  </Box>
);

export default memo(Transitions);
