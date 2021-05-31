import { getSession } from "next-auth/client";
const BookMark = () => {
  return <div>BookMark</div>;
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
    props: {},
  };
};

export default BookMark;
