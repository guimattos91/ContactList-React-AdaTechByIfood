import { useCallback, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'

const SearchComponent = () => {
  const [search, setSearch] = useState('')
  const [hasSearch, setHasSearch] = useState(false)
  const handleSearch = useCallback(() => {
    setHasSearch(true)
  }, [])

  return (
    <>
      <div className="relative mx-auto mb-6 mt-[-1.5rem] h-9 w-10/12">
        <input
          id="search"
          type="text"
          className="h-12 w-full appearance-none rounded-md border-2 border-input bg-background
           px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-0"
          placeholder="Pesquisar pelo nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length >= 3 && (
          <button
            type="button"
            className="absolute right-0 top-2 flex h-8 w-8 items-center pr-2 text-4xl hover:text-primary"
            onClick={handleSearch}
          >
            <IoMdSearch />
          </button>
        )}
      </div>
      {hasSearch && <p>Você buscou {search}</p>}
    </>
  )
}

export { SearchComponent }
