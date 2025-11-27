"""
Router GraphQL integrado com FastAPI
Expõe o schema GraphQL em um endpoint
"""

from fastapi import APIRouter
from strawberry.fastapi import GraphQLRouter
from schemas.GRAPHQL.graphql_schema import schema

graphql_router = GraphQLRouter(schema, path="/graphql")

router = APIRouter()

