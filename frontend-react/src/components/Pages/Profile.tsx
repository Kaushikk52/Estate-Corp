import React from 'react'
import { useParams, Link } from "react-router-dom";

export default function Profile() {
 const { id } = useParams<{ id: string }>();
  return (
    <div>Profile : {id}</div>
  )
}
