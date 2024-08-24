'use client'
import { useState, useEffect } from 'react'
import { FaRegCopy, FaEye, FaEyeSlash } from 'react-icons/fa'

interface ApiKey {
  api_key: string
  created_at: any
}
const APIKey = ({ user }: { user: any }) => {
  const user_id = user?.id
  const [randomString, setRandomString] = useState('')
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({})
  const fetchApiKeys = async (user_id: string) => {
    const response = await fetch('/api/apikey/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id })
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error fetching API keys:', result.error)
    } else {
      console.log('Fetched API keys:', result.data)
      setApiKeys(result.data)
    }
  }
  const insertApiKey = async (user_id: string, api_key: string) => {
    const response = await fetch('/api/apikey/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id, api_key })
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Error inserting API key:', result.error)
    } else {
      console.log('API key inserted successfully:', result.data)
    }
  }

  const generateRandomString = async () => {
    const characters =
      'ABCDEFGHIJKLMNOPQasjdhkasjABCDEFGHIJKLMNOPQa!@$$#@$!@!#@sjdhkasjhdkashdajkshdkajsdhRSTUVWXYasdjkkkkkkkkkkkkkkkkZabcdefghijklmnopqrstuvwxyz01asdjhaskdjhaskABCDEFGHIJKLMNOPQasjdhkasjhdkashdajkshdkajsdhRSTUVWXYasdjkkkkkkkkkkkkkkkkZabcdefghijklmnopqrstuvwxyz01asdjhaskdjhaskjdhkasjhd23456789ABCDEFGHIJKLMNOPQasjdhkasjhdkashdajkshdkajsdhRSTUVWXYasdjkkkkkkkkkkkkkkkkZabcdefghijklmnopqrstuvwxyz01asdjhaskdjhaskjdhkasjhd23456789jdhkasjhd23456789ABCDEFGHIJKLMNOPQasjdhkasjhdkashdajkshdkajsdhRSTUVWXYasdjkkkkkkkkkkkkkkkkZabcdefghijklmnopqrstuvwxyz01asdjhaskdjhaskjdhkasjhd23456789hdkashdajkshdkajsdhRSTUVWXYasdjkkkkkkkkkkkkkkkkZabcdefghijklmnopqrstuvwxyz01asdjhaskdjhaskjdhkasjhd23456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < 50; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    setRandomString(result)
    await insertApiKey(user_id, result)
    fetchApiKeys(user_id)
  }
  const toggleVisibility = (key: string) => {
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }))
  }
  const copyToClipboard = (randomString: string) => {
    navigator.clipboard.writeText(randomString)
    alert('Copied to clipboard')
  }
  useEffect(() => {
    fetchApiKeys(user_id)
  }, [user_id])
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create your API key</h2>
      <div className="mb-4">
        <button
          onClick={generateRandomString}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate
        </button>
      </div>
      {randomString && (
        <div className="flex items-center bg-black-500 p-4 rounded shadow">
          <span className="mr-4 ">{randomString}</span>
          <button
            onClick={() => copyToClipboard(randomString)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaRegCopy size={20} />
          </button>
        </div>
      )}
      <br />
      <br />
      <hr />
      <br />
      <br />
      <h3 className="text-xl font-bold mb-4">Your API Keys</h3>
      {apiKeys && apiKeys.length > 0 ? (
        <div px-32>
          {apiKeys.map((key, index) => (
            <div
              key={index}
              className="flex items-center mb-2 justify-between w-full border border-black-700 p-4 rounded"
            >
              <div>
                <p className="mr-4">
                  {visibility[key.api_key]
                    ? key.api_key
                    : `${key.api_key.substring(0, 15)}***`}
                </p>
              </div>
              <div>
                <button
                  onClick={() => copyToClipboard(key.api_key)}
                  className="text-gray-400 hover:text-blue-700 mr-4"
                >
                  <FaRegCopy size={20} />
                </button>
                <button
                  onClick={() => toggleVisibility(key.api_key)}
                  className="text-white-500 hover:text-white-700"
                >
                  {visibility[key.api_key] ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
                <span className="ml-4 text-gray-500">
                  Created on: {new Date(key.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No keys available</p>
      )}
    </div>
  )
}
export default APIKey
