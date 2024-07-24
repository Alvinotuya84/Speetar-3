import {FlashList} from '@shopify/flash-list';
import {useQuery} from '@tanstack/react-query';
import _ from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Alert, Image, ScrollView, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import Page from '@/src/components/reusables/Page';
import ThemedTextInput from '@/src/components/reusables/ThemedTextInput';
import Box from '@/src/components/reusables/Box';
import ThemedButton, {
  ThemedIconButton,
} from '@/src/components/reusables/ThemedButton';
import ThemedActivityIndicator from '@/src/components/reusables/ThemedActivityIndicator';
import ThemedModal, {
  ThemedModalProps,
} from '@/src/components/reusables/ThemedModal';
import {useTheme} from '@/src/hooks/useTheme.hook';
import {sHeight} from '@/src/constants/dimensions.constants';
import ThemedCard from '@/src/components/reusables/ThemedCard';
import ThemedIcon from '@/src/components/reusables/ThemedIcon';
import {cryptoIcons} from '@/assets-info/Icons/new-crypto-icons/crypto_2';
import {
  BitStampSocketResponse,
  EnrichedTicker,
  Ticker,
} from '@/src/types/market';
import {handleErrorResponse} from '@/src/utils/error.utils';
import ThemedText from '@/src/components/reusables/ThemedText';
import {formatMoney} from '@/src/utils/currency.utils';
import {generateWidgetHtml} from '@/src/utils/webview.utils';

const currency2 = ['USD', 'EUR', 'USDT', 'USDC', 'GDP', 'BTC', 'ETH'] as const;

const MarketDataScreen = () => {
  const [selectedCurrencyOne, setSelectedCurrencyOne] = useState<string>('USD');

  const [fethcingMarketInfo, setfethcingMarketInfo] = useState(false);

  const [walletInfo, setwalletInfo] = useState<any[]>([]);

  const [tickerData, setTickerData] = useState<EnrichedTicker[]>([]);

  const [selectedPair, setSelectedPair] = useState<EnrichedTicker | null>(null);
  const [initialSelectedPair, setInitialSelectedPair] =
    useState<EnrichedTicker | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };
  const hasSetSelectedPair = useRef(false);

  useEffect(() => {
    const tickerSocket = new WebSocket('wss://ws.bitstamp.net');
    try {
      if (tickerSocket) {
        tickerSocket.onopen = () => {
          tickerSocket.send(
            JSON.stringify({
              event: 'bts:subscribe',
              data: {channel: 'ticker_v2'},
            }),
          );
        };
        tickerSocket.onmessage = _.throttle(event => {
          const response = JSON.parse(event.data) as BitStampSocketResponse;

          let _acceptedCryptos: any[] = [];
          setwalletInfo(bal => {
            _acceptedCryptos = bal;
            return bal;
          });
          if (response.data.tickers) {
            const tickers = response.data.tickers.map(tick => {
              return {
                ...tick,
                currency1: tick.pair.replace(/\/.*/, ''),
                currency2: tick.pair.replace(/.*\//, ''),
                symbol: tick.pair.toUpperCase().replace('/', ''),
                change: parseFloat(
                  (100 - (tick.open / tick.close) * 100).toFixed(2),
                ),
              };
            });

            setTickerData(tickers);
            if (!hasSetSelectedPair.current) {
              setSelectedPair(
                tickers
                  .filter(tick => tick.currency2 === selectedCurrencyOne)
                  .filter(tick =>
                    tick.pair.toLowerCase().includes(searchQuery.toLowerCase()),
                  ) // Filter based on search query
                  .sort((a, b) => b.close - a.close)[0],
              );
              hasSetSelectedPair.current = true;
            }
          } else {
          }
        }, 2000);
        tickerSocket.onclose = () => {
          tickerSocket.close();
        };
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      if (tickerSocket) {
        tickerSocket.close();
      }
    };
  }, []);
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <>
      <Page px={20} header={{title: 'Market'}} gap={10}>
        <Box block pa={20} radius={30} color={theme.surface}>
          {selectedPair?.symbol && (
            <WebView
              source={{
                html: generateWidgetHtml({
                  backgroundColor: theme.background,
                  theme: colorScheme,
                  symbol: `BITSTAMP:${selectedPair!.symbol}`,
                }),
              }}
              style={{height: 280, overflow: 'hidden', borderRadius: 30}}
            />
          )}
        </Box>
        <ThemedTextInput
          placeholder="Search Coin"
          dense
          onChangeText={handleSearchQueryChange}
          value={searchQuery}
        />
        <Box block>
          <ScrollView horizontal>
            <Box direction="row" gap={10} align="center">
              {currency2.map(curr => (
                <ThemedButton
                  key={curr}
                  label={curr}
                  size="xxs"
                  type={selectedCurrencyOne === curr ? 'primary' : 'surface'}
                  onPress={() => setSelectedCurrencyOne(curr)}
                />
              ))}
            </Box>
          </ScrollView>
        </Box>
        {(fethcingMarketInfo || tickerData.length === 0) && (
          <ThemedActivityIndicator />
        )}
        <ThemedText>Select any of the currency pairs below</ThemedText>

        <Box height={400} width={'100%'}>
          <FlashList
            data={tickerData
              .filter(tick => tick.currency2 === selectedCurrencyOne)
              .filter(tick =>
                tick.pair.toLowerCase().includes(searchQuery.toLowerCase()),
              ) // Filter based on search query
              .sort((a, b) => b.close - b.close)}
            renderItem={({item}) => (
              <ThemedButton
                type="text"
                onPress={() => {
                  setSelectedPair(item);
                }}>
                <CryptoCurrencyCard currencyTick={item} />
              </ThemedButton>
            )}
            estimatedItemSize={80}
          />
        </Box>
        <ThemedModal
          visible={selectedPair ? true : false}
          close={() => setSelectedPair(null)}
          onRequestClose={() => {
            setSelectedPair(null);
          }}
          containerProps={{
            px: 0,
            pt: 20,
            pb: 0,
            gap: 10,
            align: 'center',
          }}
          position="bottom"
          hideCloseButton>
          {selectedPair && (
            <CurrencyTrade
              pair={selectedPair}
              close={() => setSelectedPair(null)}
            />
          )}
        </ThemedModal>
      </Page>
    </>
  );
};

function CurrencyTrade({
  pair,
  close,
}: {
  pair: EnrichedTicker;
  close: () => void;
}) {
  const [orders, setOrders] = useState<any>([]);

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  const filterOrders = useMemo(() => {
    const {bids, asks}: any = orders;

    const sellOrders = asks?.slice(0, 7);
    const buyOrders = bids?.slice(0, 7);
    const change = {
      amount: (
        ((buyOrders?.[0]?.[0] - sellOrders?.[0]?.[0]) / buyOrders?.[0]?.[0]) *
        100
      ).toFixed(4),
      type: function () {
        return Math.sign(this.amount as unknown as number) === 1
          ? 'buy'
          : Math.sign(this.amount as unknown as number) === -1
          ? 'sell'
          : '';
      },
    };
    return {
      sellOrders,
      buyOrders,
      change,
    };
  }, [orders]);

  useEffect(() => {
    let ordersSocket: WebSocket = new WebSocket('wss://ws.bitstamp.net');

    ordersSocket.onopen = () => {
      ordersSocket.send(
        JSON.stringify({
          event: 'bts:subscribe',
          data: {
            channel: `order_book_${
              pair.currency1.toLowerCase() + pair.currency2.toLowerCase()
            }`,
          },
        }),
      );
    };

    ordersSocket.onmessage = _.throttle(event => {
      const response = JSON.parse(event.data);
      setOrders(response.data);
    }, 2000);

    ordersSocket.onclose = () => {
      ordersSocket.close();
    };

    ordersSocket.onerror = err => {
      handleErrorResponse(err);
    };

    return () => {
      if (ordersSocket) {
        ordersSocket.close();
      }
    };
  }, []);

  const [detailOrderBook, setDetailOrderBook] = useState<any>([]);

  useEffect(() => {
    const tradeHistorySocket = new WebSocket('wss://ws.bitstamp.net');

    tradeHistorySocket.onopen = () => {
      tradeHistorySocket.send(
        JSON.stringify({
          event: 'bts:subscribe',
          data: {
            channel: `detail_order_book_${
              pair.currency1.toLowerCase() + pair.currency2.toLowerCase()
            }`,
          },
        }),
      );
    };

    tradeHistorySocket.onmessage = _.throttle(event => {
      const response = JSON.parse(event.data);
      setDetailOrderBook(response.data);
    }, 2000);

    tradeHistorySocket.onclose = () => {
      tradeHistorySocket.close();
    };

    tradeHistorySocket.onerror = err => {
      handleErrorResponse(err);
    };

    return () => {
      tradeHistorySocket.close();
    };
  }, []);

  const filterDetailOrderBook = useMemo(() => {
    const {bids, asks}: any = detailOrderBook;

    const sellOrders = asks?.slice(0, 7);
    const buyOrders = bids?.slice(0, 7);
    const changes = asks
      ?.map((ask: any, index: number) => {
        const price = parseFloat(ask?.[0]);
        const amount = parseFloat(ask?.[1]);
        const time = new Date(ask?.[2] / 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        // Side is current price - previous price
        const side =
          index === 0 ? 0 : price - parseFloat(asks?.[index - 1]?.[0]);
        return {price, amount, time, side};
      })
      .slice(0, 7);

    return {
      sellOrders,
      buyOrders,
      changes,
    };
  }, [detailOrderBook]);

  const theme = useTheme();
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Box block justify="space-between" px={20} direction="row" align="center">
        <ThemedIconButton icon={{name: 'x'}} onPress={close} />
        <Box align="center">
          <ThemedText fontWeight="bold" size={'lg'}>
            {pair?.currency1} / {pair?.currency2}
          </ThemedText>
          <ThemedText>{formatMoney(pair?.close || 0, true)}</ThemedText>
        </Box>
        {pair && (
          <Box>
            <ThemedText
              size={'sm'}
              color={
                pair.change > 0
                  ? theme.success
                  : pair.change < 0
                  ? theme.danger
                  : theme.background
              }
              fontWeight="bold">
              {pair!.change > 0 ? '+' : ''}
              {pair.change}%
            </ThemedText>
          </Box>
        )}
      </Box>
      <Box block>
        <ScrollView
          style={{height: sHeight - 200}}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}>
          <Box block pa={20} radius={30} color={theme.surface}>
            {pair?.symbol && (
              <WebView
                source={{
                  html: generateWidgetHtml({
                    backgroundColor: theme.background,
                    theme: colorScheme,
                    symbol: `BITSTAMP:${pair!.symbol}`,
                  }),
                }}
                style={{height: 280, overflow: 'hidden', borderRadius: 30}}
              />
            )}
          </Box>
          <Box block gap={10} direction="row">
            <BuyBids bids={filterOrders.buyOrders} />
            <SellAsks asks={filterOrders.sellOrders} />
          </Box>
          <OrderBook tradeHistory={filterDetailOrderBook.changes} />
          {/* <OrderHistory />
          <OpenOrders /> */}
        </ScrollView>
        {/* <ThemedCard direction="row" pb={insets.bottom}>
          <ThemedButton
            label={'Buy'}
            size="sm"
            color={theme.success}
            flex={0.5}
            onPress={() => setShowBuyModal(true)}
          />
          <ThemedButton
            label={'Sell'}
            size="sm"
            color={theme.danger}
            flex={0.5}
            onPress={() => setShowSellModal(true)}
          />
        </ThemedCard> */}
      </Box>
    </>
  );
}

interface TradeHistoryChange {
  price: number;
  amount: number;
  time: string;
  side: number;
}

function OrderBook({tradeHistory}: {tradeHistory: TradeHistoryChange[]}) {
  const theme = useTheme();

  useEffect(() => {
    console.log('Trade History: ');
    console.log(tradeHistory);
  }, []);

  return (
    <ThemedCard flex={1} title="Trade History">
      <Box
        direction="row"
        justify="space-between"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.background,
        }}
        py={10}>
        <ThemedText size={'sm'}>Side</ThemedText>
        <ThemedText size={'sm'}>Price</ThemedText>
        <ThemedText size={'sm'}>Amount</ThemedText>
        <ThemedText size={'sm'}>Time</ThemedText>
      </Box>
      {tradeHistory && (
        <>
          <Box>
            {tradeHistory.map((change: TradeHistoryChange, index: number) => (
              <Box
                key={index}
                block
                direction="row"
                justify="space-between"
                py={4}>
                <Box px={5}>
                  {change.side > 0 ? (
                    <ThemedIcon
                      source="AntDesign"
                      name="arrow-up"
                      color={theme.success}
                    />
                  ) : (
                    <ThemedIcon
                      source="AntDesign"
                      name="arrow-down"
                      color={theme.danger}
                    />
                  )}
                </Box>
                <ThemedText size={'xs'} fontWeight="light">
                  {change.price.toFixed(2)}
                </ThemedText>
                <ThemedText size={'xs'} fontWeight="light">
                  {change.amount.toFixed(4)}
                </ThemedText>
                <ThemedText size={'xs'} fontWeight="light">
                  {change.time}
                </ThemedText>
              </Box>
            ))}
          </Box>
        </>
      )}
    </ThemedCard>
  );
}

function CryptoCurrencyCard({currencyTick}: {currencyTick: Ticker}) {
  const theme = useTheme();

  const currency1 = currencyTick.pair.replace(/\/.*/, '');
  const currency2 = currencyTick.pair.replace(/.*\//, '');
  const change = parseFloat(
    (100 - (currencyTick.open / currencyTick.close) * 100).toFixed(2),
  );
  return (
    <Box
      direction="row"
      align="center"
      justify="center"
      gap={10}
      block
      color={theme.surface}
      pa={10}
      radius={15}
      my={5}>
      <Image
        style={[{width: 25, height: 25}]}
        source={cryptoIcons.find(icon => icon.name === currency1)?.image}
        resizeMode={'contain'}
      />
      <Box flex={1} direction="row" justify="space-between">
        <Box align="flex-start" justify="flex-start">
          <Box direction="row" align="center" justify="center">
            <ThemedText size={'sm'} fontWeight="semibold">
              {currency1} /
            </ThemedText>
            <ThemedText size={'xs'} fontWeight="light">
              {' '}
              {currency2}
            </ThemedText>
          </Box>
        </Box>
        <Box justify="center" align="center" direction="row" gap={10}>
          <ThemedText size={'sm'} fontWeight="semibold">
            {currencyTick.close > 0
              ? formatMoney(currencyTick.close, true, 4).replace('.0000', '.00')
              : formatMoney(currencyTick.close, true, 6)}
          </ThemedText>
          <Box
            py={4}
            px={8}
            radius={6}
            color={
              change > 0
                ? theme.success
                : change < 0
                ? theme.danger
                : theme.background
            }
            align="center"
            justify="center"
            width={70}>
            <ThemedText
              size={'xs'}
              color={change > 0 || change < 0 ? 'white' : theme.text}
              fontWeight="bold">
              {change > 0 ? '+' : ''}
              {change}%
            </ThemedText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const BuyBids = ({bids}: {bids: any}) => {
  const theme = useTheme();
  return (
    <ThemedCard flex={1} title="Buy Orders">
      <Box
        direction="row"
        justify="space-between"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.background,
        }}
        py={10}>
        <ThemedText size={'sm'}>Price</ThemedText>
        <ThemedText size={'sm'}>Amount</ThemedText>
      </Box>

      {bids &&
        bids.map((bid: any, index: number) => (
          <Box key={index} block direction="row" justify="space-between" py={4}>
            <ThemedText color={theme.danger} size={'xs'} fontWeight="light">
              {bid[0]}
            </ThemedText>
            <ThemedText size={'xs'} fontWeight="light">
              {bid[1]}
            </ThemedText>
          </Box>
        ))}
    </ThemedCard>
  );
};

type Props = {
  asks: any;
};

const SellAsks = ({asks}: Props) => {
  const theme = useTheme();

  return (
    <ThemedCard flex={1} title="Sell Orders">
      <Box
        direction="row"
        justify="space-between"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.background,
        }}
        py={10}>
        <ThemedText size={'sm'}>Price</ThemedText>
        <ThemedText size={'sm'}>Amount</ThemedText>
      </Box>
      {asks &&
        asks.map((ask: any, index: number) => (
          <Box key={index} block direction="row" justify="space-between" py={4}>
            <ThemedText color={theme.danger} size={'xs'} fontWeight="light">
              {ask[0]}
            </ThemedText>
            <ThemedText size={'xs'} fontWeight="light">
              {ask[1]}
            </ThemedText>
          </Box>
        ))}
    </ThemedCard>
  );
};

export default MarketDataScreen;
