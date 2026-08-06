import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import Hero from "../../components/home/Hero";

import SectionTitle from "../../components/common/SectionTitle";
import SearchBar from "../../components/home/SearchBar";

import CategoryFilter from "../../components/home/CategoryFilter";

import MovieGrid from "../../components/home/MovieGrid";
import { useEffect, useState } from "react";

import { getMovies } from "../../services/movieService";

import MovieCard from "../../components/home/MovieCard";

import MovieGrid from "../../components/home/MovieGrid";


function Home(){

    return(

        <>

            <Navbar/>

            <main
                className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-8
                "
            >

           <Hero/>

<div className="mt-20">

<SectionTitle

title="Now Showing"

subtitle="Choose your favourite movie"

/>

<SearchBar/>

<div className="mt-8">

<CategoryFilter/>

</div>

<div className="mt-10">

<MovieGrid>

    {

        movies.map((movie)=>(

            <MovieCard

                key={movie.id}

                movie={movie}

            />

        ))

    }

</MovieGrid>

</div>

</div>

    )

}

export default Home;

const [movies, setMovies] = useState([]);

const [loading, setLoading] = useState(true);

useEffect(() => {

    fetchMovies();

}, []);

async function fetchMovies() {

    try {

        const response = await getMovies();

        setMovies(response.data.data);

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

}