const CommentDetails = (props) => {
  // console.log(router.query.commentId);
  return <div>this is tweet comment id: {props.id}</div>;
};

export const getServerSideProps = (context) => {
  console.log(context.query);
  return {
    props: {
      id: context.query.commentId,
    },
  };
};

export default CommentDetails;
