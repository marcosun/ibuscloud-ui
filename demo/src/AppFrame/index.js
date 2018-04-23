import React from 'react';
import {hot} from 'react-hot-loader';

import AppFrame from 'ibuscloud-ui/AppFrame';

/**
 * Export AppFrame Page
 */
@hot(module)
class AppFramePage extends React.Component {
  /**
   * Render a form sending post data
   * @return {Component}
   */
  render() {
    return (
      <AppFrame
        navs={[{
          text: 'AppFrame',
          path: '/appFrame',
        }, {
          text: '其他组件（暂未开发）',
          path: '/others',
        }]}
      >
        <strong>Start writing your page here. AppFrame has created an AppBar and a Drawer for you.</strong>
        <p>The following area will be filled with a long paragraph to demonstrate scrolling behaviour</p>
        <p>
          Today I want to tell you three stories about my life.

          The first is about connecting the dots. My biological mother, an unwed graduate student, put me up for adoption and she wanted me to grow up with parents who were graduates. It was all set for me to be adopted by a lawyer and his wife, but they decided they wanted a girl at the last minute and I ended up being adopted by another couple: my mother never graduated college and my father never graduated high school. My biological mother refused to sign the adoption papers until my mother promised I would go to college. 17 years later, I dropped out of college not knowing what I wanted to do with my life and trusted that it would all work out ok. I now didn’t have to go to classes that were of no interest to me and dropped in on ones I did find interesting. It wasn’t easy, I had no dorm room and little money. But what I discovered through following my curiosity and intuition turned out to be priceless later on.

          The calligraphy class I dropped in on later inspired the beautiful fonts used when we designed the first MacKintosh computer. You can’t connect the dots looking forwards, you can only connect them looking backwards. You have to trust that the dots will somehow connect in your future, this will encourage you to follow your heart.

          My second story is about love and loss. I was lucky that I discovered what I loved doing and that Apple became such a huge success. It began in my garage when I was 20 and later became huge. I later got fired as someone I hired to run the company with me and I had different visions of the future. I lost what I loved most and I was devastated. But I realised I still loved doing it, so I started over and was free to be perhaps the most creative I have ever been in my life. During the next few years I founded a company named NeXT, a company named Pixar and fell in love with the woman who would become my wife. Remarkably, Apple bought next so I returned to Apple with the new technology we had created with NeXT. I also had a wonderful family with my wife. None of this would have happened if I hadn’t been fired from Apple. Even when life hits you hard, what really keeps you going is what you love. If you haven’t found it yet, keep looking, don’t settle. As with all matters of the heart, you’ll know when you’ve found it.

          My third story is about death. I read a quote once that said, live each day as if it were your last and someday you’ll be right. Knowing that I will be dead soon was the most important tool to help me make big choices in life. Fear of failure, embarrassment and pride all fall away in the face of death and only what is truly important remains. I was diagnosed with terminal pancreatic cancer, but was fortunate in that it turned out to be curable and I’m fine now. Death is the destination we all share. Although nobody wants to die, death is perhaps the most essential thing about life. It clears away the old and makes way for the new. Your time is limited so don’t waste it living someone else’s life, or be trapped by dogma which is being trapped by other people’s thinking. Have the courage to follow your heart and intuition, they somehow already know what you want to become. Stay hungry, stay foolish.
        </p>
        <p>
          Today I want to tell you three stories about my life.

          The first is about connecting the dots. My biological mother, an unwed graduate student, put me up for adoption and she wanted me to grow up with parents who were graduates. It was all set for me to be adopted by a lawyer and his wife, but they decided they wanted a girl at the last minute and I ended up being adopted by another couple: my mother never graduated college and my father never graduated high school. My biological mother refused to sign the adoption papers until my mother promised I would go to college. 17 years later, I dropped out of college not knowing what I wanted to do with my life and trusted that it would all work out ok. I now didn’t have to go to classes that were of no interest to me and dropped in on ones I did find interesting. It wasn’t easy, I had no dorm room and little money. But what I discovered through following my curiosity and intuition turned out to be priceless later on.

          The calligraphy class I dropped in on later inspired the beautiful fonts used when we designed the first MacKintosh computer. You can’t connect the dots looking forwards, you can only connect them looking backwards. You have to trust that the dots will somehow connect in your future, this will encourage you to follow your heart.

          My second story is about love and loss. I was lucky that I discovered what I loved doing and that Apple became such a huge success. It began in my garage when I was 20 and later became huge. I later got fired as someone I hired to run the company with me and I had different visions of the future. I lost what I loved most and I was devastated. But I realised I still loved doing it, so I started over and was free to be perhaps the most creative I have ever been in my life. During the next few years I founded a company named NeXT, a company named Pixar and fell in love with the woman who would become my wife. Remarkably, Apple bought next so I returned to Apple with the new technology we had created with NeXT. I also had a wonderful family with my wife. None of this would have happened if I hadn’t been fired from Apple. Even when life hits you hard, what really keeps you going is what you love. If you haven’t found it yet, keep looking, don’t settle. As with all matters of the heart, you’ll know when you’ve found it.

          My third story is about death. I read a quote once that said, live each day as if it were your last and someday you’ll be right. Knowing that I will be dead soon was the most important tool to help me make big choices in life. Fear of failure, embarrassment and pride all fall away in the face of death and only what is truly important remains. I was diagnosed with terminal pancreatic cancer, but was fortunate in that it turned out to be curable and I’m fine now. Death is the destination we all share. Although nobody wants to die, death is perhaps the most essential thing about life. It clears away the old and makes way for the new. Your time is limited so don’t waste it living someone else’s life, or be trapped by dogma which is being trapped by other people’s thinking. Have the courage to follow your heart and intuition, they somehow already know what you want to become. Stay hungry, stay foolish.
        </p>
        <p>
          Today I want to tell you three stories about my life.

          The first is about connecting the dots. My biological mother, an unwed graduate student, put me up for adoption and she wanted me to grow up with parents who were graduates. It was all set for me to be adopted by a lawyer and his wife, but they decided they wanted a girl at the last minute and I ended up being adopted by another couple: my mother never graduated college and my father never graduated high school. My biological mother refused to sign the adoption papers until my mother promised I would go to college. 17 years later, I dropped out of college not knowing what I wanted to do with my life and trusted that it would all work out ok. I now didn’t have to go to classes that were of no interest to me and dropped in on ones I did find interesting. It wasn’t easy, I had no dorm room and little money. But what I discovered through following my curiosity and intuition turned out to be priceless later on.

          The calligraphy class I dropped in on later inspired the beautiful fonts used when we designed the first MacKintosh computer. You can’t connect the dots looking forwards, you can only connect them looking backwards. You have to trust that the dots will somehow connect in your future, this will encourage you to follow your heart.

          My second story is about love and loss. I was lucky that I discovered what I loved doing and that Apple became such a huge success. It began in my garage when I was 20 and later became huge. I later got fired as someone I hired to run the company with me and I had different visions of the future. I lost what I loved most and I was devastated. But I realised I still loved doing it, so I started over and was free to be perhaps the most creative I have ever been in my life. During the next few years I founded a company named NeXT, a company named Pixar and fell in love with the woman who would become my wife. Remarkably, Apple bought next so I returned to Apple with the new technology we had created with NeXT. I also had a wonderful family with my wife. None of this would have happened if I hadn’t been fired from Apple. Even when life hits you hard, what really keeps you going is what you love. If you haven’t found it yet, keep looking, don’t settle. As with all matters of the heart, you’ll know when you’ve found it.

          My third story is about death. I read a quote once that said, live each day as if it were your last and someday you’ll be right. Knowing that I will be dead soon was the most important tool to help me make big choices in life. Fear of failure, embarrassment and pride all fall away in the face of death and only what is truly important remains. I was diagnosed with terminal pancreatic cancer, but was fortunate in that it turned out to be curable and I’m fine now. Death is the destination we all share. Although nobody wants to die, death is perhaps the most essential thing about life. It clears away the old and makes way for the new. Your time is limited so don’t waste it living someone else’s life, or be trapped by dogma which is being trapped by other people’s thinking. Have the courage to follow your heart and intuition, they somehow already know what you want to become. Stay hungry, stay foolish.
        </p>
        <p>
          Today I want to tell you three stories about my life.

          The first is about connecting the dots. My biological mother, an unwed graduate student, put me up for adoption and she wanted me to grow up with parents who were graduates. It was all set for me to be adopted by a lawyer and his wife, but they decided they wanted a girl at the last minute and I ended up being adopted by another couple: my mother never graduated college and my father never graduated high school. My biological mother refused to sign the adoption papers until my mother promised I would go to college. 17 years later, I dropped out of college not knowing what I wanted to do with my life and trusted that it would all work out ok. I now didn’t have to go to classes that were of no interest to me and dropped in on ones I did find interesting. It wasn’t easy, I had no dorm room and little money. But what I discovered through following my curiosity and intuition turned out to be priceless later on.

          The calligraphy class I dropped in on later inspired the beautiful fonts used when we designed the first MacKintosh computer. You can’t connect the dots looking forwards, you can only connect them looking backwards. You have to trust that the dots will somehow connect in your future, this will encourage you to follow your heart.

          My second story is about love and loss. I was lucky that I discovered what I loved doing and that Apple became such a huge success. It began in my garage when I was 20 and later became huge. I later got fired as someone I hired to run the company with me and I had different visions of the future. I lost what I loved most and I was devastated. But I realised I still loved doing it, so I started over and was free to be perhaps the most creative I have ever been in my life. During the next few years I founded a company named NeXT, a company named Pixar and fell in love with the woman who would become my wife. Remarkably, Apple bought next so I returned to Apple with the new technology we had created with NeXT. I also had a wonderful family with my wife. None of this would have happened if I hadn’t been fired from Apple. Even when life hits you hard, what really keeps you going is what you love. If you haven’t found it yet, keep looking, don’t settle. As with all matters of the heart, you’ll know when you’ve found it.

          My third story is about death. I read a quote once that said, live each day as if it were your last and someday you’ll be right. Knowing that I will be dead soon was the most important tool to help me make big choices in life. Fear of failure, embarrassment and pride all fall away in the face of death and only what is truly important remains. I was diagnosed with terminal pancreatic cancer, but was fortunate in that it turned out to be curable and I’m fine now. Death is the destination we all share. Although nobody wants to die, death is perhaps the most essential thing about life. It clears away the old and makes way for the new. Your time is limited so don’t waste it living someone else’s life, or be trapped by dogma which is being trapped by other people’s thinking. Have the courage to follow your heart and intuition, they somehow already know what you want to become. Stay hungry, stay foolish.
        </p>
      </AppFrame>
    );
  }
}

export default AppFramePage;
