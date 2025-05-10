# Open Cider.js Library
This package provides core functionality for the Open Cider API. This is a low-backend solution that offers user authentication and management, as well as cloud storage, leaderboard, and friends functions to allow you quickly prototype and build more comprehensive apps and games to ship fast while focusing only on what matters most. Visit [www.opencider.com](www.opencider.com/documentation) for more.

# Usage
The package client needs to be initialized in the authentication step with your service's secret key, which is available on the [dev.opencider.com](Developer Dashboard).

## Authentication
Developers can access the authentication function by leveraging the initialize function. This function allows developers to immediately incorporate sso authentication on a transparent, passwordless platform.
```typescript Initialize Client
import { initialize } from "opencider-sdk";

const serviceKey = "cidsvc:...";
initialize(serviceKey);
```

This process returns a client with a service user token which represents the connection between you and the user. You can also resume a session using the generated service user token as demonstrated below.
```typescript
import { createClient } from "opencider-sdk";

const token = "Service User Token from previous session";
createClient(token);
```

## Document
User profile details are referred to in this context as documents. To get user documents, simply add the following line.
```typescript
client.document.get()
```

You can also update profile details on behalf of the user although this is NOT recommended unless it is absolutely critical to your application and the user has granted your app the permission to do so. Important to note that all updates are recorded and visible to the user in a tamper-proof immutale way.
```typescript
client.document.update({username: 'ILostABet'})
```

## Summary Data
User Summary Data is an API that allows apps to store data. This data can be cache data, data for syncing across devices, cart information, or whatever your app needs. There are also numeric metrics that can be stored as well like a kill count or xp in a game, a wallet balance, follower count, tasks completed and so on. This data is also represented on aggregate on the developer dashboard to provide high level insights to the developer.

Here is how to store data using the Summary Data API.
```typescript
client.summaryData.set({
    incrBy: false, //is the new metric data overwriting the pre-existing data?
    metric0: "{...}", //user preference settings.
    metric1: 10, //new wallet balance. This will be visible to the user
    metric2: 1.2, //some other info
})

```

To retrieve the stored data, add the following line:
```typescript
client.summaryData.get()
```

Finally, you can geneerate a leaderboard based on the metric1 value. So, based on the last example, we would be generating a leaderboard based on the wallet balance (hopefully, you don't actually do that in a real life scenario):
```typescipt
client.summaryData.leaderboard()
```


## Social
Social API provides some social functionality on the user management platforom so you don't have to. Add friends, send friend requests, and get you friend list with simple function calls.

To get your friend list, call the following:
```typsecript
client.social.getFriends()
```

You can also get friend requests similarly
```typescipt
client.social.getFriendRequests()
```

If you want to accept or reject a friend request, you can use the follwing code snippet.
```typescript
const personId = '' //person's id from the friend request list.
const status   = '' //action to take i.e. 'Accept', 'Reject', or 'Block'

client.social.updateFriendRequest(personId, status)
```


Should you need to remove a friend from your friend list, here's how you can achieve that.
```typescript
client.social.removeFriend(friendId)
```

Here's how to block a friend.
```typescript
client.social.blockFriend(friendId)
```

Here's how to unblock a friend
```typescript
client.social.unblockFriend(friendId)
```

# Contributing
See something that needs fixing? You can open pull requests for fixes or improvements. All pull requests must be submitted with no change in the repository license and they will be reviewed by our development team. Accompanying unit tests are encouraged.