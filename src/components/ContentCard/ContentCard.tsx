import * as React from "react";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { trimString } from "@/utils/commonUtils";

import { ContentCardProps as Props } from "./ContentCard.interface";

export function ContentCard(props: Props): React.ReactElement {
  const router = useRouter();

  const onViewMoreClick = () => {
    router.push(`/content/${props.id}`);
  };

  return (
    <Card sx={{ border: "2px solid #2081b5", minHeight: "272px" }}>
      <CardHeader title={trimString(props.title, 28)} />
      <CardContent
        sx={{ minHeight: "152px", maxHeight: "152px", overflow: "hidden" }}
      >
        {props.content && (
          <div dangerouslySetInnerHTML={{ __html: props.content }} />
        )}
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
        <Button variant="text" onClick={onViewMoreClick}>
          View More
        </Button>
      </CardActions>
    </Card>
  );
}
