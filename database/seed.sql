-- =============================================================================
-- Hamlet Global — Seed Data
-- =============================================================================

-- Gemstones
INSERT INTO products (id, name, category, subcategory, price, description, cert_authority, cert_number, weight, origin, cut, clarity, color, is_available, is_featured, is_new)
VALUES
(
    'gem-001', 'Colombian Emerald', 'gemstone', 'Emerald', 12500.00,
    'A breathtaking 5.2ct Colombian emerald of exceptional clarity, exhibiting the coveted "jardin" characteristic of fine Colombian stones. Sourced directly from the Muzo Valley.',
    'GIA', 'GIA-5234891', '5.20 ct', 'Muzo Valley, Colombia', 'Oval', 'Eye Clean', 'Vivid Green',
    TRUE, TRUE, FALSE
),
(
    'gem-002', 'Kashmir Sapphire', 'gemstone', 'Sapphire', NULL,
    'An exceptional 3.8ct Kashmir sapphire with the legendary velvety cornflower blue color — among the most prized of all gemstones. Unheated, with strong fluorescence.',
    'IGI', 'IGI-7823451', '3.80 ct', 'Kashmir, India', 'Cushion', 'VVS', 'Cornflower Blue',
    TRUE, TRUE, TRUE
),
(
    'gem-003', 'Burmese Ruby', 'gemstone', 'Ruby', 22000.00,
    'A magnificent 2.1ct unheated Burmese ruby displaying the coveted pigeon blood colour — the most sought-after in the world of coloured gemstones.',
    'GIA', 'GIA-9821344', '2.10 ct', 'Mogok, Myanmar', 'Oval', 'Eye Clean', 'Pigeon Blood Red',
    TRUE, FALSE, TRUE
),
(
    'gem-004', 'Ceylon Sapphire', 'gemstone', 'Sapphire', 9800.00,
    'A stunning 4.1ct Ceylon sapphire with exceptional brilliance and a vivid royal blue colour, sourced from the gem fields of Sri Lanka.',
    'SGL', 'SGL-3421876', '4.10 ct', 'Ratnapura, Sri Lanka', 'Oval', 'VS', 'Royal Blue',
    TRUE, FALSE, FALSE
),
(
    'gem-005', 'Tanzanite', 'gemstone', 'Tanzanite', 6500.00,
    'An exquisite 8.5ct tanzanite displaying rich trichroic colour shifting from deep violet-blue to burgundy. Found only in the shadow of Mount Kilimanjaro.',
    'IGI', 'IGI-5521983', '8.50 ct', 'Merelani Hills, Tanzania', 'Cushion', 'Eye Clean', 'Vivid Violet-Blue',
    TRUE, FALSE, FALSE
),
(
    'gem-006', 'Pink Diamond', 'gemstone', 'Diamond', NULL,
    'An extraordinary 1.2ct Fancy Vivid Pink diamond of exceptional rarity. GIA certified with excellent cut grade.',
    'GIA', 'GIA-4567890', '1.20 ct', 'Argyle, Australia', 'Pear', 'VS1', 'Fancy Vivid Pink',
    TRUE, FALSE, TRUE
);

-- Jewellery
INSERT INTO products (id, name, category, subcategory, price, description, cert_authority, cert_number, weight, origin, cut, clarity, color, metal, occasion, is_available, is_featured, is_new)
VALUES
(
    'jwl-001', 'Burmese Ruby Ring', 'jewellery', 'Rings', 18500.00,
    'An extraordinary platinum ring featuring a 2.5ct unheated Burmese ruby, flanked by brilliant-cut diamonds in a classic halo setting. A statement of timeless elegance.',
    'GIA', 'GIA-9123456', '2.50 ct', 'Myanmar', 'Oval', 'Eye Clean', 'Pigeon Blood Red',
    'Platinum 950', 'Engagement / Special Occasions',
    TRUE, TRUE, FALSE
),
(
    'jwl-002', 'Pink Diamond Pendant', 'jewellery', 'Necklaces', NULL,
    'An extraordinary 1.2ct Fancy Pink diamond pendant set in 18K rose gold with a pavé diamond surround.',
    'GIA', 'GIA-4567890', '1.20 ct', NULL, 'Pear', 'VS1', 'Fancy Vivid Pink',
    '18K Rose Gold', 'Gala / Anniversary',
    TRUE, TRUE, TRUE
),
(
    'jwl-003', 'Sapphire Eternity Band', 'jewellery', 'Rings', 8500.00,
    'An elegant eternity band featuring alternating Ceylon sapphires and brilliant-cut diamonds, channel-set in 18K white gold.',
    'SGL', 'SGL-8834512', '6.50 ct total', NULL, NULL, NULL, NULL,
    '18K White Gold', 'Anniversary / Weddings',
    TRUE, FALSE, FALSE
),
(
    'jwl-004', 'Emerald Drop Earrings', 'jewellery', 'Earrings', 14200.00,
    'Exceptional drop earrings featuring matched pair Colombian emeralds totalling 4.8ct, suspended from diamond-set bails in platinum.',
    'IGI', 'IGI-6634821', '4.80 ct pair', 'Colombia', NULL, NULL, NULL,
    'Platinum 950', 'Gala / Formal Events',
    TRUE, FALSE, TRUE
);

-- Pre-Owned
INSERT INTO products (id, name, category, subcategory, price, description, metal, occasion, is_available, is_featured, is_new)
VALUES
(
    'pre-001', 'Cartier Love Bracelet', 'pre-owned', 'Bracelets', 7200.00,
    'Authentic pre-owned Cartier Love Bracelet in 18K yellow gold, size 17. Authenticated by our master gemologist with original papers and box. Excellent condition.',
    '18K Yellow Gold', 'Daily / Special',
    TRUE, FALSE, FALSE
),
(
    'pre-002', 'Van Cleef Alhambra Necklace', 'pre-owned', 'Necklaces', 4800.00,
    'Iconic pre-owned Van Cleef & Arpels Vintage Alhambra necklace with malachite motifs in 18K yellow gold. Accompanied by full authentication documentation.',
    '18K Yellow Gold', 'Daily / Evening',
    TRUE, FALSE, FALSE
);

-- Product Images
INSERT INTO product_images (product_id, url, position) VALUES
('gem-001', 'https://images.unsplash.com/photo-1551122089-4e3e72477432?w=900&q=90', 0),
('gem-001', 'https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=900&q=90', 1),
('gem-002', 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=90', 0),
('gem-003', 'https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=900&q=90', 0),
('gem-004', 'https://images.unsplash.com/photo-1551122089-4e3e72477432?w=900&q=90', 0),
('gem-005', 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=90', 0),
('gem-006', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=90', 0),
('jwl-001', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=90', 0),
('jwl-001', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&q=90', 1),
('jwl-002', 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=90', 0),
('jwl-003', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=900&q=90', 0),
('jwl-004', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=90', 0),
('pre-001', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=90', 0),
('pre-002', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=90', 0);
