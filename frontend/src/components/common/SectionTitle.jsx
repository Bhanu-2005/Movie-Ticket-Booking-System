function SectionTitle({title,subtitle}){

    return(

        <div className="mb-10">

            <h2
                className="
                    text-4xl
                    font-bold
                "
            >

                {title}

            </h2>

            <p
                className="
                    text-gray-500
                    mt-2
                "
            >

                {subtitle}

            </p>

        </div>

    )

}

export default SectionTitle;