import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react'
import React from 'react'

interface CheckboxListProps {
  lists: string[]
}

const CheckboxList: React.FC<CheckboxListProps> = ({ lists }) => {
  return (
    <Card className="!shadow-none">
      <List className="pl-0">
        {lists.map((list, index) => (
          <ListItem key={index} className="p-0">
            <label
              htmlFor={`vertical-list-${list}`}
              className="flex w-full cursor-pointer items-center pr-3 py-2">
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id={`vertical-list-${list}`}
                  ripple={false}
                  crossOrigin={undefined}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: 'p-0',
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                {list}
              </Typography>
            </label>
          </ListItem>
        ))}
        {/* <ListItem className="p-0">
          <label
        //     htmlFor="vertical-list-react"
        //     className="flex w-full cursor-pointer items-center px-3 py-2"
        //   >
        //     <ListItemPrefix className="mr-3">
        //       <Checkbox
        //         id="vertical-list-react"
        //         ripple={false}
        //         className="hover:before:opacity-0"
        //         containerProps={{
        //           className: "p-0",
        //         }}
        //       />
        //     </ListItemPrefix>
        //     <Typography color="blue-gray" className="font-medium">
        //       React.js
        //     </Typography>
           </label>
         </ListItem> */}
        {/* <ListItem className="p-0">
          <label
            htmlFor="vertical-list-vue"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-vue"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Vue.js
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-svelte"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Checkbox
                id="vertical-list-svelte"
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography color="blue-gray" className="font-medium">
              Svelte.js
            </Typography>
          </label>
        </ListItem> */}
      </List>
    </Card>
  )
}

export default CheckboxList
