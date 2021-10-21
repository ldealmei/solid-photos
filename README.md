# solid-photos

A Solid-based photos app for mobile and web.

## Architecture
We try to go with an architecture with 3 components: clients (web & mobile), an API server and the POD server.

### Clients
- are the only ones to interact directly with PODs
- in charge of the UI

### API Server
- serves as an abstraction layer to the data model. It handles the logic of knowing what query to issue to the Pod.
- does NOT interact with the Pod; only with clients.
- handles versioning of the data model.

### Pod server
/

## API Server
- GET /photos
	- last_n
	- except

- POST /photos
- DELETE /photos

## Solid data model

/
|__ apps/
	|__ solid-photos/
		|__ v1/
			|__ 2021.10.19.0
			|__ 2021.10.19.1
			|__ 2021.10.17.0
			|__ ...
		|__ res/
			|__ photo1.jpg
			|__ photo2.jpg
			|__ ...

### Things
#### Photo
```
	name: str
	date: Date
	url: URL
```
