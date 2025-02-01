import MeSkeleton from "./ME-Skeleton";

const MeList = () => {
    return (
        new Array(3).fill(0).map((_,idx)=><MeSkeleton/>)
    )
}

export default MeList;
