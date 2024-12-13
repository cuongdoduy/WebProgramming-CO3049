import React, { useState, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/solid'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Select,
  Option,
} from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import useDebounce from '@/hook/useDebounce'

const TABLE_HEAD = ['Id', 'Name', 'Price', 'Created At', 'Action']

interface MembersTableProps {
  products: Array<{
    id: number
    name: string
    price: number
    status: string
    slug: string
    createdAt: string
  }>
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
  }
  filter: {
    query: string
    status: string
  }
  // eslint-disable-next-line no-unused-vars
  handlePageChange: (page: number) => void
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (filter: { name: string; value: string }) => void
}

export function ProductTable({
  products,
  pagination,
  filter,
  handlePageChange,
  handleFilterChange,
}: MembersTableProps) {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState(filter.query)

  const debounce = useDebounce(searchQuery, 500)

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    handleFilterChange({ name: 'query', value: debounce as string })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce])

  // eslint-disable-next-line no-unused-vars
  const handleDeleteUser = async (id: number) => {
    // eslint-disable-next-line no-alert
  }

  const handleRoleSelectChange = (value: string | undefined) => {
    handleFilterChange({ name: 'status', value: value || '' })
  }

  return (
    <Card className="h-full w-full shadow-none">
      <CardHeader floated={false} shadow={false} className="rounded-none mb-4">
        <div className="flex justify-between gap-8">
          <Typography variant="h3" color="blue-gray">
            Product List
          </Typography>
        </div>
      </CardHeader>
      <div className="flex w-[50%] gap-4 mx-4">
        <Input
          label="Search"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          crossOrigin={undefined}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Select
          label="Select Status"
          value={filter.status}
          onChange={handleRoleSelectChange}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}>
          <Option value="">All</Option>
          <Option value="In Stock">In Stock</Option>
          <Option value="Out of Stock">Out of Stock</Option>
        </Select>
      </div>

      <CardBody className="overflow-x-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-normal leading-none opacity-70 ${
                      index != 0 ? 'text-center' : ''
                    }`}>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({ id, name, price, slug, createdAt }, index: number) => {
                const isLast = index === products.length - 1
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50'
                return (
                  <tr
                    key={index}
                    onClick={() => router.push(`/admin/products/${slug}`)}
                    className="cursor-pointer">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal">
                            {id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max m-auto">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70 text-center">
                          {name}
                        </Typography>
                      </div>
                    </td>

                    {/* <td className={classes}>
                      <div className="w-max m-auto">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70 text-center">
                          {name}
                        </Typography>
                      </div>
                    </td> */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center">
                        ${price}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center">
                        {createdAt}
                      </Typography>
                    </td>

                    <td className="text-center">
                      <Tooltip content="Delete User">
                        <IconButton
                          variant="text"
                          onClick={() => handleDeleteUser(id)}>
                          <TrashIcon className="h-4 w-4" color="red" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              }
            )}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  <Typography variant="small" color="blue-gray">
                    We are loading data... Please wait a moment.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 flex-row-reverse">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {pagination.currentPage} of {pagination.totalPages}
        </Typography>
        <div className="flex gap-2 flex-1">
          <Button
            variant="outlined"
            size="sm"
            onClick={() =>
              pagination.currentPage > 1 &&
              handlePageChange(pagination.currentPage - 1)
            }>
            Previous
          </Button>
          <div className="max-w-[250px]">
            <form className="max-w-sm mx-auto">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={pagination.currentPage.toString()}
                onChange={e => handlePageChange(Number(e.target.value))}>
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}`}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <Button
            variant="outlined"
            size="sm"
            onClick={() =>
              pagination.currentPage <= pagination.totalPages - 1 &&
              handlePageChange(pagination.currentPage + 1)
            }>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
