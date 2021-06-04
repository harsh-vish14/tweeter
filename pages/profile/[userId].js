import { getSession } from "next-auth/client";

import Profile from "../../components/profile/profile";
const ProfilePage = ({ session, id }) => {
  return session && <Profile id={id} session={session} />;
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
    props: { session, id: context.query.userId },
  };
};
export default ProfilePage;
