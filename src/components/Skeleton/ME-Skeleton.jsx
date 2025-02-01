import * as S from './ME-Skeleton-style'

const MeSkeleton = () => {

    return(
        <S.Container>
            <>
                <S.Poster />
                <S.TextWrapper>
                    <S.Title />
                    <S.Detail />
                    <S.Detail />
                </S.TextWrapper>
            </>
            <S.Events/>
        </S.Container>
    )
}

export default MeSkeleton