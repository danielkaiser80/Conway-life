import { Box } from "@mui/material";
import { memo } from "react";

interface CellProps {
  alive: number;
  onClick: () => void;
}

const Cell = ({ alive, onClick }: CellProps) => (
  <Box
    onClick={onClick}
    sx={{
      width: 15,
      height: 15,
      margin: "3px",
      backgroundColor: alive ? "#000" : "#6bbe92",
    }}
  />
);

export default memo(Cell);
