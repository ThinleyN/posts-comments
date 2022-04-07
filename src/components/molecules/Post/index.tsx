import { CommentProps } from "../../molecules/Comments";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Button } from "../../atoms/Button";
import { Comment } from "../Comments";
import { AddComment } from "../AddComment";

export interface PostProp {
   id: number,
   title: string,
   comments: Array<CommentProps>
}

let useStyles:any = createUseStyles((theme: any) => {
    return {
      container: {
        padding: 10,
        borderRadius: 9,
        background: theme.lightBg,
        marginBottom: 20,
        "&:last-child": {
          marginBottom: 0
        },
        paddingBottom: 20
      },
      title:{
        color: theme.textLightBlack
      },
      idHolder: {
        color: theme.textLightBlack
      },
      showComments: {
      },
      commentHolder: {
        padding: 20,
        paddingBottom: 0
      }
        
    };
});

const Post: React.FC<PostProp> = ({title,id,comments}) => {
    const classes = useStyles();
    const [showComments, setShowComments] = useState(false as boolean);

    const handleShowComment = () => {
      setShowComments(!showComments);    
    }
    

    return (
        <div className={classes.container}>
          <h1 className={classes.title}>
            {title}
          </h1>
          <h3 className={classes.idHolder}>
            The post id is {id}
          </h3>
          <Button className={classes.showComments} onClick={handleShowComment}>
          {showComments ? 'Hide Comments' : `Show comments (${comments.length})`}   
          </Button>

          {showComments && (
           comments.length ?  comments.map(comment => {
              return(
                <div key={comment.id} className={classes.commentHolder}>
                  <Comment id={comment.id} postId={comment.postId} body={comment.body} />
                </div>
              )
            }
            ) :
            ( 
            <div>There is no comments to display</div>
            )
            )
          }

          {showComments && <AddComment postId={id}/>}
        </div>
    );
};

export { Post };
