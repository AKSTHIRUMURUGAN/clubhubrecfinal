// Import necessary dependencies
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Events.css"; // Import your custom styles

export default function Events() {
  // Get events from the Redux store
  const events = useSelector((state) => state.events.events);

  // State for search term, sorting, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Function to handle sorting
  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to change the current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to render sorting icon
  const renderSortIcon = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i>;
    }
    return <i className="fas fa-sort"></i>;
  };

  // Filter events based on search term
  const filteredEvents = events.filter((event) =>
    Object.values(event).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort the filtered events based on the selected column and order
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate the events for display
  const itemsPerPage = 5;
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-lg-8 col-md-10 col-sm-12 p-3">
        {/* Add Event Link */}
        <Link to="/login" className="btn btn-success btn-sm">
          Add Event +
        </Link>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search..."
          className="form-control mt-3 mb-3"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Table */}
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th onClick={() => handleSort("en")}>
                Event Name {renderSortIcon("en")}
              </th>
              <th onClick={() => handleSort("cn")}>
                Club Name {renderSortIcon("cn")}
              </th>
              <th onClick={() => handleSort("ev")}>
                Venue {renderSortIcon("ev")}
              </th>
              <th onClick={() => handleSort("ec")}>
                Capacity {renderSortIcon("ec")}
              </th>
              <th onClick={() => handleSort("ed")}>
                Date {renderSortIcon("ed")}
              </th>
              <th onClick={() => handleSort("et")}>
                Time {renderSortIcon("et")}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event) => (
              <tr key={event.id} className="table-row">
                <td className="rounded-cell">{event.en}</td>
                <td className="rounded-cell">{event.cn}</td>
                <td className="rounded-cell">{event.ev}</td>
                <td className="rounded-cell">{event.ec}</td>
                <td className="rounded-cell">{formatDate(event.ed)}</td>
                <td className="rounded-cell">{event.et}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
