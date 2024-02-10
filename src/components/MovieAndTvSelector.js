import Select from 'react-select';


const option = [
    { value: 'popularity.desc', label: 'Popularity' },
    { value: 'vote_average.desc', label: 'Vote average' },
    { value: 'primary_release_date.desc', label: 'Release date' },
]

const movieGenres = [
    { value: 28, label: 'Action' },
    { value: 12, label: 'Adventure' },
    { value: 16, label: 'Animation' },
    { value: 35, label: 'Comedy' },
    { value: 80, label: 'Crime' },
    { value: 99, label: 'Documentary' },
    { value: 18, label: 'Drama' },
    { value: 10751, label: 'Family' },
    { value: 14, label: 'Fantasy' },
    { value: 36, label: 'History' },
    { value: 27, label: 'Horror' },
    { value: 10402, label: 'Music' },
    { value: 9648, label: 'Mystery' },
    { value: 10749, label: 'Romance' },
    { value: 878, label: 'Science Fiction' },
    { value: 10770, label: 'TV Movie' },
    { value: 53, label: 'Thriller' },
    { value: 10752, label: 'War' },
    { value: 37, label: 'Western' }
]
const tvGenres = [
    { value: 10759, label: 'Action & Adventure' },
    { value: 16, label: 'Animation' },
    { value: 35, label: 'Comedy' },
    { value: 80, label: 'Crime' },
    { value: 99, label: 'Documentary' },
    { value: 18, label: 'Drama' },
    { value: 10751, label: 'Family' },
    { value: 10762, label: 'Kids' },
    { value: 9648, label: 'Mystery' },
    { value: 10763, label: 'News' },
    { value: 10764, label: 'Reality' },
    { value: 10765, label: 'Sci-Fi & Fantasy' },
    { value: 10766, label: 'Soap' },
    { value: 10767, label: 'Talk' },
    { value: 10768, label: 'War & Politics' },
    { value: 37, label: 'Western' }
]


const MovieAndTvSelector = ({ mediaType, setGenres, setSorttype }) => {
    const handleSelectItem = (selectedItem, action) => {
        action.name==='genres'?setGenres('&with_genres='+selectedItem.map(e => e.value).join('%2C')):setSorttype(selectedItem.value);
    }

    return (
        <div className='relative w-auto flex flex-col gap-2 items-end'>
            <div className="relative w-full h-auto flex flex-col sm:flex-row gap-3 md:gap-10 justify-between items-end sm:items-center">
                <p className="text-xl md:text-2xl font-bold text-center">{mediaType==='movie'?'Explore your movies':'Explore your TV show'}</p>
                <Select
                    name='sort_by'
                    defaultValue={'popularity.desc'}
                    options={option}
                    isClearable={false}
                    onChange={handleSelectItem}
                    placeholder='Sort by'
                    styles={{
                        control: (base) => ({
                            ...base, 
                            width: '180px',
                            height: '40px',
                            backgroundColor: 'black',
                            color: 'white',
                        }),
                        option: (base, item) => {
                            return {
                                ...base,
                                color: 'white',
                                backgroundColor: item.isFocused ? 'gray' : 'black',
                            }
                        },
                        menu: (base) => {
                            return {
                                ...base,
                                backgroundColor: 'black',
                                border: '1px solid white',
                                zIndex: '2',
                            }
                        },
                        input: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                        placeholder: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                        singleValue: (base) => {
                            return {
                                ...base,
                                color: 'white',
                            }
                        },
                    }}
                />
            </div>
            <Select
                name='genres'
                options={mediaType === 'movie' ? movieGenres : tvGenres}
                isMulti
                isClearable={true}
                onChange={handleSelectItem}
                placeholder='&nbsp;Genres'
                styles={{
                    control: (base) => ({
                        ...base, 
                        minWidth: '180px',
                        minHeight: '40px',
                        backgroundColor: 'black',
                        color: 'white',
                        
                    }),
                    option: (base, item) => {
                        return {
                            ...base,
                            color: 'white',
                            backgroundColor: item.isFocused ? 'gray' : 'black',
                        }
                    },
                    menu: (base) => {
                        return {
                            ...base,
                            backgroundColor: 'black',
                            border: '1px solid white',
                            zIndex: '1',
                        }
                    },
                    input: (base) => {
                        return {
                            ...base,
                            color: 'white',
                        }
                    },
                    placeholder: (base) => {
                        return {
                            ...base,
                            color: 'white',
                        }
                    },
                    singleValue: (base) => {
                        return {
                            ...base,
                            color: 'white',
                        }
                    },
                    multiValue: (base) => {
                        return {
                            ...base,
                            backgroundColor: 'gray',
                            color: 'black',
                        }
                    },
                    multiValueRemove: (base) => {
                        return {
                            ...base,
                            color: 'black',
                        }
                    },
                    valueContainer: (base) => {
                        return {
                            ...base,
                            padding: '2px'
                        }
                    }
                }}
            />
        </div>
    )
}

export default MovieAndTvSelector;