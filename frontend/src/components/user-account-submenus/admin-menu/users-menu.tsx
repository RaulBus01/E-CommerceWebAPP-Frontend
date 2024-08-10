import React, { useEffect,useState } from 'react'
import { userData } from '../../../types/UserType'
import useUser from '../../../hooks/useUser'

const UsersMenu = () => {
  const [customers, setCustomers] = useState<userData[] | null>(null)
  const [distributors, setDistributors] = useState<userData[] | null>(null)
  const { fetchUsers } = useUser()

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        const customers = users?.filter((user) => user.role === 'customer')
        const distributors = users?.filter((user) => user.role === 'distributor')
        setCustomers(customers)
        setDistributors(distributors)
      })
  }, [fetchUsers])


  return (
    <div>
      
        <div> 
          <h2>Customers</h2>
          {customers && customers.length > 0 ? (
            <div>
              {customers.map((customer) => (
                <div key={customer._id}>
                  <p>{customer.name}</p>
                  <p>{customer.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No customers found</p>
          )}
        </div>
        <div>
          <h2>Distributors</h2>
          {distributors && distributors.length > 0 ? (
            <div>
              {distributors.map((distributor) => (
                <div key={distributor._id}>
                  <p>{distributor.name}</p>
                  <p>{distributor.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No distributors found</p>
          )}
        </div>
        
      
    </div>
  )
}

export default UsersMenu