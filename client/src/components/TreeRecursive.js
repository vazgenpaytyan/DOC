import React from 'react'
import File from './File'
import Folder from './Folder'

function TreeRecursive({ data }) {

    return data.map(item => {

        if (item.type === 'folder') {
            return (
                <Folder key={item.name} id={item.id} name={item.name}>
                    <TreeRecursive data={item.childrens} />
                </Folder>
            )
        }
        return <File key={item.name} id={item.id} name={item.name} />;

    })
}

export default TreeRecursive