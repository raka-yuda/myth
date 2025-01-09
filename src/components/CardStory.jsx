import Link from "next/link";

const CardStory = ({
  story,
  language,
}) => {
  return (
    <div
      className="rounded-lg shadow p-4 text-black border-8 border-white bg-cover bg-center"
    >
      <div className="flex flex-col rounded border-2 border-white p-4 h-full justify-between">
        <p className="text-xl text-gray-600 mb-24">
          {story?.title[language]}
        </p>
        <p className="text-xl text-gray-600 mb-2">
          {language === 'english' ? 'Synopsis:' : 'Sinopsis:'}
        </p>
        <p className="text-xl text-gray-600 mb-6 line-clamp-5">
          {story.synopsis[language]}
        </p>
        <Link
          href={{
            pathname: `/story/${story.id[language]}`,
            query: { lang: language },
          }}
          className="text-base text-end text-gray-600 mb-2 hover:underline"
        >
          {language === 'english' ? 'Read More...' : 'Baca Selengkapnya...'} 
        </Link>
      </div>
    </div>
  );
}

export default CardStory;