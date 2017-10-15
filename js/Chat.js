(function (document, window, undefined) {

    document.addEventListener("DOMContentLoaded", function(event) {

// get you mashape api key here: https://market.mashape.com/webknox/question-answering
        var mashapeApiKey = 'WEgFYkbmXwmshwHPXbJevSf4M1TFp1xcxdfjsnRPcznf62jQ02';
        var wx = ChatBot.Engines.webknox(mashapeApiKey);

        var sampleConversation = [
            "Hi",
            "My name is Fry",
            "Where is China?",
            "What is the population of China?",
            "Bye"
        ];
        var config = {
            botName: 'WebKnox',
            inputs: '#humanInput',
            inputCapabilityListing: false,
            engines: [wx],
            addChatEntryCallback: function(entryDiv, text, origin) {
                entryDiv.delay(200).slideDown();
            }
        };
        ChatBot.init(config);
        ChatBot.setBotName("SIA");



// optional but for better suggests we use unibox search suggests
        $('#humanInput').unibox({
            // we use the suggest URL from the webknox engine
            suggestUrl: wx.getSuggestUrl(),
            // minimum number of characters before the suggests shows
            minChars: 1,
            enterCallbackResult: function(){},
        });

    });

})(document, window);
