import Header from '../components/Header';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import requests from '../utils/requests';
import { useRecoilState } from 'recoil';
import { movieId } from '../atoms/modalAtom.';


type Movie = {
    id: number;
    poster_path: string;
    original_title: string;
}

function Search() {
    const [searchResult, setSearchResult] = useState<Movie[]>([]);
    const [id,setId] = useRecoilState(movieId);
    const { register, handleSubmit, getValues } = useForm();

    const router = useRouter();

    const onSubmit: SubmitHandler<Record<string, any>> = () => {
        const formData = getValues();
        const movieName = formData.movieName;
        if (typeof movieName === 'string') {
            fetch(requests.getSearchMovie(movieName))
                .then((res) => res.json())
                .then((result) => {
                    setSearchResult(result.results);
                });
        }
    };

    return (
        <div className="relative h-screen bg-[#141414] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-red-600 lg:h-[140vh]">
            <Head>
                <title>Search- Stavit-TV</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />

            <div className="container mt-10 p-5">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center mt-5">
                    <div className="flex-1">
                        <input
                            type="text"
                            className="w-full px-3 py-2 leading-tight text-gray-700 bg-white border-2 border-gray-400 rounded-md appearance-none focus:outline-none focus:bg-white focus:border-blue-500 text-sm"
                            placeholder="Search Movie Here ..."
                            {...register("movieName")}
                        />
                    </div>

                    <div className="pl-4">
                        <button type="submit" className="px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-blue active:bg-red-800">
                            Search
                        </button>
                    </div>
                </form>

                <div className="cardSearch">
                    {searchResult.map((s) => (
                        // only show movies that have an image
                        s.poster_path && (
                            <div className="flex flex-col items-center justify-between p-4 rounded-lg" key={s.id}>
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                                    onClick={() => {
                                        router.push(`/movie-details`);
                                        setId(s.id);
                                    }
                                    }
                                    className="w-full sm:w-auto"
                                />
                                <h5 className="text-white mt-4">{s.original_title}</h5>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;
