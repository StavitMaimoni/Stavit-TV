import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom.';
import Banner from '../components/Banner';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import useList from '../hooks/useList';
import useSubscription from '../hooks/useSubscription';
import { Movie } from '../typings';


const Movies = () => {
  const { user, loading } = useAuth();
  const subscription = useSubscription(user);
  const showModal = useRecoilValue(modalState);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid) as Movie[];

  if (loading || subscription === null) return null;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>
          {movie?.title || movie?.original_name || 'Movies'} - Stavit-TV
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner bannerImage={list} />

        <section className="md:space-y-24">
          {/* My List */}
          {list.length > 0 && <Row title="My List" movies={list} />}
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Movies;

