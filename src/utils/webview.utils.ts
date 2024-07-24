interface WidgetConfig {
  autosize: boolean;
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  enable_publishing: boolean;
  backgroundColor: string;
  allow_symbol_change: boolean;
  save_image: boolean;
  hide_volume: boolean;
  hide_legend: boolean;
  hide_top_toolbar: boolean;
  container_id: string;
}

export function generateWidgetHtml(
  config: WidgetConfig | Record<string, any> = {},
) {
  const baseConfig = {
    autosize: true,
    symbol: 'BITSTAMP:BTCUSD',
    interval: '15',
    timezone: 'Etc/UTC',
    theme: 'light',
    style: '1',
    locale: 'en',
    enable_publishing: false,
    backgroundColor: '#F6F7FB',
    allow_symbol_change: false,
    save_image: false,
    hide_volume: true,
    hide_legend: false,
    hide_top_toolbar: false,
    container_id: 'tradingview_43e64',
  };

  const finalConfig: WidgetConfig = {
    ...baseConfig,
    ...config,
  };

  const stringFinalConfig = JSON.stringify(finalConfig);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Payecards</title>
	</head>
	<style>
		* {
            margin: 0px;
			padding: 0px;
		}
        </style>
        <body style="overflow:'hidden'">
		<div style="height: 320px">
        <!-- TradingView Widget BEGIN -->
        <div
        class="tradingview-widget-container"
        style="height: 100%; width: 100%"
        >
				<div
                id="tradingview_43e64"
                style="height: calc(100% - 32px); width: 100%"
				></div>
				<div class="tradingview-widget-copyright">
                <a
						href="https://www.tradingview.com/"
						rel="noopener nofollow"
						target="_blank"
						><span class="blue-text">Track all markets on TradingView</span></a
					>
				</div>
				<script
					type="text/javascript"
					src="https://s3.tradingview.com/tv.js"
                    ></script>
                    <script type="text/javascript">
					new TradingView.widget(${stringFinalConfig});
				</script>
			</div>
			<!-- TradingView Widget END -->
		</div>
	</body>
</html>
`;

  return html;
}
