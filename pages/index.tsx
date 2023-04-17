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
import payments from '../lib/stripe';
import { Movie } from '../typings';
import requests from '../utils/requests';

interface Props {
  topRated: Movie[];
  actionSeries: Movie[];
  comedySeries: Movie[];
  mysterySeries: Movie[];
  realitySeries: Movie[];
  documentariesSeries: Movie[];
  products: Product[];
}

const Home = ({
  actionSeries,
  comedySeries,
  documentariesSeries,
  mysterySeries,
  realitySeries,
  topRated,
}: Props) => {
  const { user, loading } = useAuth();
  const subscription = useSubscription(user);
  const showModal = useRecoilValue(modalState);
  const series = useRecoilValue(movieState);
  const list = useList(user?.uid);

  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && '!h-screen overflow-hidden'
      }`}
    >
      <Head>
        <title>
          {series?.title || series?.original_name || 'TV Shows'} - Stavit-TV
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner bannerImage={topRated} />

        <section className="md:space-y-24">
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action" movies={actionSeries} />
          {/* My List */}
          {list.length > 0 && <Row title="My List" movies={list} />}

          <Row title="Comedies" movies={comedySeries} />
          <Row title="Mystery" movies={mysterySeries} />
          <Row title="Reality" movies={realitySeries} />
          <Row title="Documentaries" movies={documentariesSeries} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch(err =>console.log(err))

  const [
    topRated,
    actionSeries,
    comedySeries,
    mysterySeries,
    realitySeries,
    documentariesSeries,
  ] = await Promise.all([
    fetch(requests.fetchSeriesTopRated).then((res) => res.json()),
    fetch(requests.fetchSeriesAction).then((res) => res.json()),
    fetch(requests.fetchSeriesComedy).then((res) => res.json()),
    fetch(requests.fetchSeriesMystery).then((res) => res.json()),
    fetch(requests.fetchSeriesReality).then((res) => res.json()),
    fetch(requests.fetchDocumentariesSeries).then((res) => res.json()),
  ])

  return {
    props: {
      topRated: topRated.results,
      actionSeries: actionSeries.results,
      comedySeries: comedySeries.results,
      mysterySeries: mysterySeries.results,
      realitySeries: realitySeries.results,
      documentariesSeries: documentariesSeries.results,
      products,
    },
  }
}
