import Head from 'next/head';
import Header from '../components/Header';
import { modalState, movieId, movieState, videoType } from '../atoms/modalAtom.';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Movie, Credits } from '../typings';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../components/Modal';


function MovieDetails() {
    const id = useRecoilValue(movieId);
    const [movie, setMovie] = useState<Movie>();
    const [credits, setCredits] = useState<Credits>();
    const [type, setType] = useRecoilState(videoType);
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    const [showModal, setShowModal] = useRecoilState(modalState);

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=08cc33bd5ae3a747598ce2ad84376e66`);
            const data = await res.json();
            setMovie(data);
        };

        const fetchCast = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=08cc33bd5ae3a747598ce2ad84376e66`);
            const data = await res.json();
            setCredits(data);
        };

        if (id) {
            fetchMovie();
            fetchCast();
        }
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`relative h-screen bg-[#141414] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-red-600 lg:h-[140vh]${
            showModal && '!h-screen overflow-hidden'
          }`}>
            <Head>
                <title>Search- Stavit-TV</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {showModal && <Modal />}

            <div className="contain mt-5">
                <div className="row p-5">
                    <div className="col-lg-2">
                        {movie.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                className='moviePoster' />
                        )}

                    </div>
                    <div className="col-lg-10 mt-5 p-4">
                        <h1 className="mt-2 mb-2">{movie.original_title}</h1>
                        <p className="mt-3 mb-3">{movie.overview}</p>
                        <button
                            className="bannerButton bg-[red]/70"
                            onClick={() => {
                                setCurrentMovie(movie);
                                setShowModal(true);
                            }}>
                            Watch Trailer
                        </button>
                        <div>
                            <h2 className="text-white text-center mb-4">Top Cast</h2>
                            <div className="flex justify-center items-center">
                                <div className="mt-4 p-4">
                                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-10">
                                        {credits &&
                                            credits.cast.map((c) => (
                                                <div className="col-span-1 lg:col-span-2" key={uuidv4()}>
                                                    <div className="flex items-center mb-4">
                                                        {c.profile_path && (
                                                            <img src={`https://image.tmdb.org/t/p/original/${c.profile_path}`} className="w-16 h-16 rounded-full mr-4" />
                                                        )}
                                                        <div>
                                                            <h3 className="text-white mb-1">{c.original_name}</h3>
                                                            <p className="text-white">{c.character}</p>
                                                            <p className="text-white">{c.known_for_department}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        {credits && credits.crew.map((c) => (
                                            <div className="col-span-1 lg:col-span-2" key={uuidv4()}>
                                                <div className="flex items-center mb-4">
                                                    {c.profile_path && (
                                                        <img src={`https://image.tmdb.org/t/p/original/${c.profile_path}`} className="w-16 h-16 rounded-full mr-4" />
                                                    )}
                                                    <div>
                                                        <h3 className="text-white mb-1">{c.original_name}</h3>
                                                        <p className="text-white">{c.job}</p>
                                                        <p className="text-white">{c.known_for_department}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;
