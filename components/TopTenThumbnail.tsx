import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom.';
import { Movie } from '../typings';

interface Props {
    movie: Movie | DocumentData;
    index: number;
}

function TopTenThumbnail({ movie,index }: Props) {
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
    const [showModal, setShowModal] = useRecoilState(modalState);

    const handleClick = () => {
        setCurrentMovie(movie);
        setShowModal(true);
    };

    return (
            <div
                className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[200px] md:hover:scale-105`}
                onClick={handleClick}
            >
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path
                        }`}
                    className="rounded-sm object-cover md:rounded" layout="fill" />
            <div className="imageNumber">{index + 1}</div>
            </div>
    )
}

export default TopTenThumbnail;
