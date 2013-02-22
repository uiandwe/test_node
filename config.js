// 1. URL �� Consumer ���� ����
var config = {
	requestTokenUrl: "https://api.twitter.com/oauth/request_token",
	authorizeUrl: "https://api.twitter.com/oauth/authorize",
	accessTokenUrl: "https://api.twitter.com/oauth/access_token",
	consumerKey: "3qnXxscGoVCCHlwnqbKKw",
	consumerSecret: "6gGOm4XCjgADY2v0zlQbsACZ0efmks9jfTKr9wD3Y",
	callbackUrl: "http://test_node.uiandwe.c9.io",
	apiUrl: "https://api.twitter.com"
}

// �ܺ� ���⿡�� ������ �� �ֵ��� export
exports.config = config;