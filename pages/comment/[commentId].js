import { getSession } from "next-auth/client";
const CommentDetails = (props) => {
  // console.log(router.query.commentId);
  return <div>this is tweet comment id: {props.id}</div>;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      id: context.query.commentId,
    },
  };
};

export default CommentDetails;
