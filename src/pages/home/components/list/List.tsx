/**
 * List
 */

import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {IVideoItem} from '../../../../typing';
import { getCredentials } from '../../../../util/login';
import {get} from '../../../../util/request';
import {Item} from './Item';

type Props = PropsWithChildren<{
  setUploaded: Dispatch<SetStateAction<boolean>>;
  isUploaded: boolean;
  navigation: any;
  refresh: boolean;
}>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: '#f7f7f7',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});

const dataProviderMaker = data =>
  new DataProvider(
    (r1, r2) =>
      r1.id !== r2.id ||
      r1.items[0].likes !== r2.items[0].likes ||
      r1.items[1].likes !== r2.items[1].likes,
  ).cloneWithRows(data);

export const List: React.FC<Props> = ({
  navigation,
  isUploaded,
  setUploaded,
  refresh,
}) => {
  const recyclerListView = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [list, setList] = useState<
    {
      id: number;
      items: IVideoItem<ImageSourcePropType>[];
    }[]
  >([]);
  const dataProvider = useMemo(() => dataProviderMaker(list), [list]);
  const dimension = Dimensions.get('window');
  const layoutProvider = useRef(
    new LayoutProvider(
      index => 1,
      (_, dim) => {
        dim.width = dimension.width;
        dim.height = 265;
      },
    ),
  );

  layoutProvider.current.shouldRefreshWithAnchoring = false;

  function dataMapping(list: IVideoItem<string>[]) {
    if (list.length === 0) {
      return [];
    }
    const listData = [...list];
    let data: {
      id: number;
      items: IVideoItem<ImageSourcePropType>[];
    }[] = [];
    if (listData.length !== 0) {
      data = [];
    }
    if (listData.length % 2 !== 0) {
      listData.push({
        id: 0,
        name: '',
        uname: '',
        pic: '',
        url: '',
        likes: false,
      });
    }
    listData.forEach((element, index) => {
      if (index % 2 === 0) {
        data.push({
          id: element.id,
          items: [
            {
              id: element.id,
              name: element.name,
              uname: element.uname,
              pic: {
                uri: element.pic,
              },
              url: element.url,
              likes: element.likes,
            },
          ],
        });
      } else {
        data[data.length - 1].items.push({
          id: element.id,
          name: element.name,
          uname: element.uname,
          pic: {
            uri: element.pic,
          },
          url: element.url,
          likes: element.likes,
        });
      }
    });
    return data;
  }

  function filter(data, listData) {
    if(!listData){
      return data;
    }
    const r = [];
    const ids = {};
    listData.forEach(item => {
      ids[item.items[0].id] = 1;
      ids[item.items[1].id] = 1;
    });
    data.forEach(item => {
      if(!ids[item.id]){
        r.push(item);
      }
    });
    return r;
  }

  async function getList(isRefresh = false) {
    try {
      let pageNum = pageNo;
      if (isRefresh) {
        pageNum = 0;
      }
      console.log('getList, pageNo=', pageNum);

      const res = await get(
        `/getVideoList?pageNo=${pageNum}&platform=mobile&pageSize=10&userid=${
          getCredentials().id
        }`,
      );
      console.log('len:', res.data.length);
      setUploaded(false);
      const filterData = filter(res.data, isRefresh ? [] : list);
      const data = dataMapping(filterData);
      if (isRefresh) {
        // handle refresh mode, show the 1st page
        setList(data);
        setPageNo(1);
      } else if (data && data.length > 0) {
        // handle loadmore mode, concat the next page
        setList([...list, ...data]);
        setPageNo(pageNum + 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log('mount');
    getList(true);
  }, []);
  useEffect(() => {
    if (isUploaded === true) {
    console.log('uploaded refersh');

      getList(true);
    }
  }, [isUploaded]);

  useEffect(() => {
    if (refresh) {
      console.log('refresh refersh');
      getList(true);
    }
  }, [refresh]);

  if (!list.length) {
    return null;
  }
  const rowRenderer = (type, item) => {
    return (
      <View style={styles.row}>
        <Item
          data={item.items[0]}
          navigation={navigation}
          style={{marginRight: 5}}
        />
        <Item data={item.items[1]} navigation={navigation} />
      </View>
    );
  };

  function debounce(fn, timeout = 800) {
    let timer: number; // 声明计时器
    return function (...rest) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, rest);
      }, timeout);
    };
  }

  const debouncedGetList = debounce(getList);

  const onEndReached = () => {
    if (list.length > 0) {
      debouncedGetList();
    }
  };

  return (
    <View style={styles.container}>
      <RecyclerListView
        ref={recyclerListView}
        onEndReachedThreshold={300}
        rowRenderer={rowRenderer}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider.current}
        onEndReached={onEndReached}
        scrollViewProps={{
          refreshControl: (
            <RefreshControl
              refreshing={loading}
              onRefresh={async () => {
                setLoading(true);
                await getList(true);
                setLoading(false);
              }}
            />
          ),
        }}
      />
    </View>
  );
};
