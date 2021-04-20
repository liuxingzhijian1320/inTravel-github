import React, { useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import QQMap from 'qqmap';
const { Search } = Input;
const { confirm } = Modal;

// 不能删除 下面console.info
console.info(QQMap.init('你的地图key'));

let map = null;
let qq = window.qq;
// 调用Poi检索类
let searchService = {}; //调用地图的搜索服务
let markers = []; //用户搜索后显示的点的集合
let myLatlng = null;
let loading = false;
let pois = [];
let select = {};

let keyword = '';

function MyMap(props) {
  const { show } = props;
  useEffect(() => {
    console.log('componentDidMount', qq, props);
    initQQMap();
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  keyword = props.address;

  //地图初始化的方法
  const initQQMap = () => {
    const key = '你的地图key';

    //初始化地图
    qq &&
      QQMap.init(key, () => {
        // if (!window.qq) return;
        // 初始化经纬度，最开始的点
        myLatlng = new qq.maps.LatLng(props.lat, props.lng);
        // 设置地图属性
        let myOptions = {
          zoom: 16,
          center: myLatlng,
          mapTypeId: qq.maps.MapTypeId.ROADMAP,
        };
        // 创建地图，绑定dom
        map = new qq.maps.Map(document.getElementById('container'), myOptions);
        // 现实已经存在的点
        // let markerlast = new qq.maps.Marker({
        new qq.maps.Marker({
          position: myLatlng,
          map,
        });

        var infoWin = new qq.maps.InfoWindow({
          map,
        });

        // 调用检索;
        let latlngBounds = new qq.maps.LatLngBounds();
        // 调用搜索服务
        searchService = new qq.maps.SearchService({
          location: props.district === '市辖区' ? props.city : props.district,
          //设置搜索页码为1
          pageIndex: 0,
          //设置每页的结果数为5
          pageCapacity: 3,
          //设置展现查询结构到infoDIV上
          panel: document.getElementById('infoDiv'),
          complete: (results) => {
            pois = results.detail.pois;
            if (!pois) return message.error('未搜素到结果');

            for (let i = 0, l = pois.length; i < l; i++) {
              let poi = pois[i];
              latlngBounds.extend(poi.latLng);

              (function (n) {
                var marker = new qq.maps.Marker({
                  position: pois[n].latLng,
                  map,
                });
                marker.setTitle(i + 1);
                markers.push(marker);

                qq.maps.event.addListener(marker, 'click', function () {
                  infoWin.open();
                  infoWin.setContent(
                    `<div style="width:280px; padding: 10px 0px;">
                      <span style="color: #333"> 酒店名：${pois[n].name}</span>
                      <br/>
                      <span style="color: #999">地址： ${pois[n].address}</span>
                      <br/>
                      <div style="width: 100px; height: 40px; background: #1890ff; margin: 15px auto 0px auto; text-align:center; line-height:40px; border-radius: 6px; color: #fff" id='markerbtn' data-id=${pois[n].id}>选择</div>
                      </div>`
                  );
                  infoWin.setPosition(pois[n].latLng);
                });
              })(i);
            }
            map.fitBounds(latlngBounds);
          },
        });

        qq.maps.event.addListener(infoWin, 'content_changed', function () {
          // 这里需要加一个延时，给DOM元素的加载预留时间
          let timer = setTimeout(function () {
            document.getElementById('markerbtn').onclick = function (e) {
              const obj = pois.find((a) => a.id === e.target.dataset.id) || {};
              console.info(999, obj);
              if (obj && obj.name) {
                select = {
                  ...obj.latLng,
                  address: obj.address,
                  title: obj.name,
                };
                clearTimeout(timer);
                timer = null;

                confirm({
                  title: '提示',
                  content: `确认选择 ${obj.name} ？`,
                  onOk() {
                    infoWin.close();
                    handleCancel();
                    props.fn(select);
                  },
                });
              }
            };
          }, 400);
        });

        // 鼠标点击监听
        // qq.maps.event.addListener(map, 'click', (event) => {
        //   // 清除初始化位置
        //   markerlast.position = event.latLng;
        //   markerlast.setMap(null);
        //   // 获取经纬度位置
        //   let lat = event.latLng.getLat().toFixed(6);
        //   let lng = event.latLng.getLng().toFixed(6);

        //   var coord = new qq.maps.LatLng(lat, lng);
        //   var geocoder = new qq.maps.Geocoder({
        //     complete: function (result) {
        //       console.info('成功：' + result.detail.address);
        //       searchService.search(result.detail.address);
        //     },
        //   });

        //   geocoder.getAddress(coord);

        //   // console.log(66, lat, lng);
        //   // props.fn({ lat, lng });
        //   // 绘制点击的点
        //   let marker = new qq.maps.Marker({
        //     position: event.latLng,
        //     map: map,
        //   });
        //   // 添加监听事件 获取鼠标单击事件
        //   qq.maps.event.addListener(map, 'click', function (event) {
        //     marker.setMap(null);
        //   });
        //   // 清空上一次搜索结果
        //   Array.from(markers).forEach((marker) => {
        //     marker.setMap(null);
        //   });
        // });
      });
  };

  //搜索
  const searchKeyword = (keyword) => {
    // loading = true;
    // console.info('搜索', keyword, props.province);
    // 清空上一次搜索结果
    Array.from(markers).forEach((marker) => {
      marker.setMap(null);
    });
    searchService.search(keyword);
  };

  const handleOk = () => {
    props.onOk();
  };

  const handleCancel = () => {
    props.onCancel();
  };

  const getValue = (e) => {
    // console.log(111, e.target.value);
    keyword = e.target.value;
  };

  return (
    <Modal
      width="80%"
      title={
        '当前选择省份为：' + `${props.province} ${props.city} ${props.district}`
      }
      onOk={handleOk}
      onCancel={handleCancel}
      visible={props.show}
    >
      <div className="map-model-content">
        <div id="container" style={{ width: '100%', height: '400px' }}></div>
        <div className="list">
          <Search
            placeholder="请输入地址"
            enterButton
            loading={loading}
            defaultValue={props.address}
            onChange={getValue}
            onSearch={searchKeyword}
          />
          <div id="infoDiv" className="search-list"></div>
        </div>
      </div>
    </Modal>
  );
}

export default MyMap;
