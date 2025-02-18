import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
const MusicalRanking = () => {
  const [musicals, setMusicals] = useState([]);

  const { data, error, loading } = useFetch('http://13.209.69.125:8080/musicals/rank');


  return (
    <div>
    <h1>뮤지컬 랭킹</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {loading ? (
      <p>뮤지컬 리스트를 불러오는 중입니다...</p>
    ) : (
      <div id="musical-list">
        {data.result.musicalHomeList.map((musical) => (
          <div key={musical.id} className="musical">
            <img src={musical.posterUrl} alt={musical.name} />
            <h3>{musical.name}</h3>
            <p>장소: {musical.place}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default MusicalRanking;
