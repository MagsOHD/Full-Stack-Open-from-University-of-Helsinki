import { useEffect, useState } from 'react'
import dataService from './services/dataService'
import Finder from './components/Finder'
import Countries from './components/Countries'
function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const api_key = import.meta.env.VITE_SOME_KEY
  // variable api_key now has the value set in startup
  console.log(api_key)
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredCountries(filtered)
  }

  const handleButtonClick = (countryName) => {
    console.log('countryName:', countryName)
    dataService.getByName(countryName).then(data => {
      console.log('Country data:', data)
      setFilteredCountries([data]) // Update filteredCountries to show only the selected country
    })
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        dataService.getAll().then(data => {
          setCountries(data)
          setFilteredCountries(data)
        })
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
    fetchCountries()
  }
  , [])
  return (
    <div>
      <Finder value={searchTerm} handler={handleSearch}/>
      <Countries list={filteredCountries} buttonClick={handleButtonClick}/>
    </div>
  )
}

export default App
