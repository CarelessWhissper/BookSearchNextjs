import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { fetchBooks, setCurrentPage, setQuery } from '@/lib/createBookSlice';
import { Input, Button, Table, Pagination, Spin } from 'antd';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const { searchResults, currentPage, itemsPerPage, query, loading } = useSelector(
    (state: any) => state.books
  );

  // Re-fetch results if query exists but no results (e.g., after page refresh)
  useEffect(() => {
    if (query && searchResults.length === 0 && !loading) {
      dispatch(fetchBooks(query));
    }
  }, [query, searchResults.length, loading, dispatch]);

  const handleSearch = async () => {
    if (query.trim()) {
      dispatch(fetchBooks(query));
      dispatch(setCurrentPage(1));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <a
          onClick={() => {
            router.push(`/book/${encodeURIComponent(record.key)}`);
          }}
          style={{ cursor: 'pointer' }}
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author_name',
      key: 'author_name',
      render: (author: string[]) => author?.join(', ') || 'Unknown',
    },
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <Input
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onKeyPress={handleKeyPress}
          placeholder="Search for books..."
          className="max-w-md"
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={searchResults}
            rowKey="key"
            pagination={false}
            className="mt-4"
          />

          {searchResults.length > 0 && (
            <Pagination
              current={currentPage}
              total={searchResults.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              className="mt-4 text-center"
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;