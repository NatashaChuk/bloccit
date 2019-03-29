<!DOCTYPE html>
<html>
	
	<head>
		<% include ../static/partials/head.ejs %>
	</head>

	<body>
		<main class="container">
			<% include ../static/partials/navbar.ejs %>

			<h1>Topics</h1>

			<ul class="list-group">
				<% topics.forEach((topic) => { %>

					<li class = "list-group-item">
						<a href="/topics/<%= topic.id %>"> <%= topic.title %> </a>
					</li>
				<% }) %>
			</ul>

		</main>
	</body>
</html>