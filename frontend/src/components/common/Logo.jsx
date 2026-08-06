import { FaFilm } from "react-icons/fa";

function Logo() {

    return (

        <div className="flex flex-col items-center text-center mb-8">

            <div className="bg-red-600 p-4 rounded-full shadow-lg">

                <FaFilm
                    className="text-white text-4xl"
                />

            </div>

            <h1 className="text-5xl font-bold mt-6">

                CineVerse

            </h1>

            <p className="text-gray-500 mt-3">

                Book Your Next Cinematic Experience

            </p>

        </div>

    );

}

export default Logo;