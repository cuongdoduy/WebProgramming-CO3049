-- Insert Tags into Tags Table
INSERT INTO
    Tags (name, description, start_date, end_date, status)
VALUES
    -- Flash Sales (1 month duration)
    (
        'Flash Sales',
        'Special discount event for 1 month.',
        '2024-12-01',
        '2024-12-31',
        'active'
    ),
    -- Best Selling Products (no time limit)
    (
        'Best Selling Products',
        'A collection of our top-selling products.',
        NULL,
        NULL,
        'active'
    ),
    -- Explore Our Products (no time limit)
    (
        'Explore Our Products',
        'Discover a variety of new and exciting products.',
        NULL,
        NULL,
        'active'
    );