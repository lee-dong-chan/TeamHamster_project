import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { center } from "../../lib/styles";

interface IProps {
  id: number | undefined;
}

const NMap = ({ id }: IProps): JSX.Element => {
  //맵을 표시할 element를 알려주기 위한 변수
  const mapRef: React.MutableRefObject<null> = useRef(null);

  //state
  const [map, setMap] = useState<naver.maps.Map>();
  const [riderPosition, setRiderPosition] = useState<naver.maps.LatLng>();
  const [riderMarker, setRiderMarker] = useState<naver.maps.Marker>();
  const [userPosition, setUserPosition] = useState<naver.maps.LatLng>();
  const [, setUserMarker] = useState<naver.maps.Marker>();
  const [boundPosition, setBoundPosition] = useState<naver.maps.LatLngBounds>();

  //custom
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  //func
  const userPositionSet = (address: string) => {
    //주소 반환
    naver.maps.Service.geocode(
      { query: address },
      (status: number, response: naver.maps.Service.GeocodeResponse) => {
        if (status !== naver.maps.Service.Status.OK) {
          console.error("Something wrong!");
          return;
        }

        //어드레스 있으면
        if (response.v2.addresses.length > 0) {
          const result = response.v2.addresses[0];

          console.log(result.y, result.x);
          setUserPosition(new naver.maps.LatLng(+result.y, +result.x));
        } else {
          console.error("유저 포지션 변환 오류");
        }
      }
    );
  };

  interface IXY {
    deliveryspot: {
      spotX: number;
      spotY: number;
    };
  }
  const getRiderLatLng = async () => {
    await axios
      .post(`${serverUrl}/GpsRiderGet/${id}`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IXY>) => {
        //성공시 콜백
        console.log("라이더 겟 데이타 보고 수정", data.data.deliveryspot);

        const x = data.data.deliveryspot.spotX;
        const y = data.data.deliveryspot.spotY;

        if (x && y) {
          setRiderPosition(new naver.maps.LatLng(y, x));
        } else {
          throw new Error("라이더 실패");
        }
      })
      .catch(() => {
        console.error("라이더 위치 실패");
        //유저와 라이더의 위치
        setRiderPosition(new naver.maps.LatLng(37.5387539, 127.1225123));
      });
  };

  interface IUserAddRes {
    PurchaseAddress: string;
  }
  const getUserAddress = async () => {
    await axios
      .post(`${serverUrl}/GpsUserGet/${id}`, {}, { withCredentials: true })
      .then((data: AxiosResponse<IUserAddRes>) => {
        userPositionSet(data.data.PurchaseAddress);
      })
      .catch(() => {
        //실패시 URL
        console.error("유저 어드레스 실패");
        userPositionSet("서울특별시 강남구 테헤란로 152");
      });
  };
  //

  //userMaker
  useEffect(() => {
    if (userPosition !== undefined) {
      setUserMarker(
        new naver.maps.Marker({
          position: userPosition,
          map: map,
          icon: {
            content:
              '<img src="./imgs/HamsterWaiter.png" alt="" style="margin: 0px; padding: 0px; border: 2px solid red; border-radius: 100%; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 35px; height: 35px; left: 0px; top: 0px; overflow: hidden;">',
            size: new naver.maps.Size(22, 35),
            anchor: new naver.maps.Point(11, 35),
          },
        })
      );
    }
  }, [userPosition]);

  //riderMaker
  useEffect(() => {
    if (riderPosition !== undefined) {
      if (riderMarker === undefined) {
        setRiderMarker(
          new naver.maps.Marker({
            position: riderPosition,
            map: map,
            icon: {
              content:
                '<img src="./imgs/HamsterRider.png" alt="" style="margin: 0px; padding: 0px; border: 2px solid blue; border-radius: 100%; display: block; max-width: none; max-height: none; -webkit-user-select: none; position: absolute; width: 35px; height: 35px; left: 0px; top: 0px; overflow: hidden;">',
              size: new naver.maps.Size(22, 35),
              anchor: new naver.maps.Point(11, 35),
            },
          })
        );
      } else {
        riderMarker.setPosition(new naver.maps.LatLng(riderPosition));
      }
    }
  }, [riderPosition]);

  //boundposition
  useEffect(() => {
    if (userPosition && riderPosition && map) {
      console.log("bound posi reset");
      setBoundPosition(
        new naver.maps.LatLngBounds(riderPosition, userPosition)
      );
    }
  }, [userPosition, riderPosition]);

  //bunding
  useEffect(() => {
    if (map && boundPosition) {
      console.log("bounding");
      map.fitBounds(boundPosition);
    }
  }, [boundPosition]);

  //mount
  useEffect(() => {
    if (mapRef.current && naver) {
      getUserAddress();
      getRiderLatLng();

      //map set
      setMap(
        new naver.maps.Map(mapRef.current, {
          mapTypeId: naver.maps.MapTypeId.NORMAL,
          zoom: 6, // 지도 확대 정도
        })
      );
    }
    // 클린업 함수 추가
    return () => {
      if (map) {
        console.log("삭제");
        naver.maps.Event.clearInstanceListeners(map);
        map.destroy();
      }
    };
  }, []);

  //naverMap으로 바뀐 mapRef을 ref로 참조하여 리턴
  return (
    <div className={`h-[740px] w-[500px] ${center}`}>
      <div ref={mapRef} className="w-[100%] h-[100%] flex"></div>;
    </div>
  );
};

export default NMap;
