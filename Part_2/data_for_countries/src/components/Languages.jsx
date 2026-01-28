import LanguagesLine from './LanguagesLine';
const Languages = ({ list }) => {
    if (!list || list.length === 0) {
        return <p>No languages found</p>
    }

    return (
        <div>
            <p>Languages : </p>
            <ul>
                {list.map((lang) => (
                    console.log('Rendering country:', lang),
                    <LanguagesLine key={lang} lang={lang} />
                ))}
            </ul>
        </div>
    )
}

export default Languages;