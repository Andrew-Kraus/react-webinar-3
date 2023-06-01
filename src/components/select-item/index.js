import { memo } from "react";

function SelectItem({ item, value }) {
    return (
        <>
            <option key={item.value} value={item._id}>
                {item.nesting > 1 ? '- '.repeat(item.nesting - 1) : ''} {item.title}
            </option>
            {item.children &&
                item.children.map((childItem) => {
                    return <SelectItem item={childItem} key={childItem._id} />;
                })}
        </>
    )
}

export default memo(SelectItem);
