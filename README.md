Goal

Create a feed for data changes. Best example is the GitHub Pull Request history.

Steps:

1. Define events: "label added", "pull request created",...
2. Implement event store: Capture and store events (kafka)
3. Capture events: Record all relevant data for each event (metadata)
4. Replay events: Recreate the state of the system at any point of time (IDEA: HoverCard with state for a given time + should be cached and have a TTL as it would not be used too often)
5. Analyze and query events

API Routes:

- `/events`: events from the event store
  - POST: create new event
  - GET: list of events
  - `/:id`:
    - GET: get specific event
- `/replay`: replay events from event store
  - GET: include a query param to specifiy timestamp of the state to be reproduced
- `/commands`: trigger command in the system that is translated into an event that gets stored in the event store
  - POST: create a command (e.g. "label added", "pull request created",..)
- `/state`: store current state of the system
  - GET: get current state
  - PUT: update current state

Typical flow to update data:

1. Create new event (with all relevant data)
2. Publish event to Kafka
   > We will probably need QStash here to send trigger about new event
3. Consume event from Kafka
4. Update current state

Example

- Chess game where every move is stored as event. That way, you can replay the whole game.
- Inside the [Vercel Activity Dashboard](https://vercel.com/dashboard/activity) you can filter by `type`. Check it out, again.
