import React from 'react'
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Tooltip,
  IconButton,
} from '@material-tailwind/react'
import Link from 'next/link'
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

const TABLE_HEAD = ['Id', 'Title', 'Description', 'Action']

interface MembersTableProps {
  tags: Array<{
    id: number
    title: string
    description: string
  }>
}

export function TagTable({ tags }: MembersTableProps) {
  return (
    <Card className="h-full w-full shadow-none">
      <CardHeader floated={false} shadow={false} className="rounded-none mb-4">
        <div className="flex justify-between gap-8">
          <Typography variant="h3" color="blue-gray">
            Tag List
          </Typography>
        </div>
      </CardHeader>

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
            {tags.map(({ id, title, description }, index: number) => {
              const isLast = index === tags.length - 1
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50'
              return (
                <tr key={index} className="cursor-pointer">
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
                        {title}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-center">
                      {description}
                    </Typography>
                  </td>
                  <td className="text-center">
                    <Link href={`/admin/tags/${id}`}>
                      <td className="text-center">
                        <Tooltip content="Edit Tag">
                          <IconButton variant="text">
                            <ChevronDoubleRightIcon className="w-6 h-6" color='blue' />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </Link>
                  </td>
                </tr>
              )
            })}
            {tags.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  <Typography variant="small" color="blue-gray">
                    There are no tags available.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}
